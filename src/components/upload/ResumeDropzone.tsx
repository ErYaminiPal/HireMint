import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  UploadCloud,
} from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/paths'
import { GlowButton } from '../ui/GlowButton'

const MAX_SIZE_MB = 10
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024

const ACCEPTED_EXTENSIONS = /\.(pdf|doc|docx)$/i

const ACCEPT_ATTR =
  '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

type FileError = 'type' | 'size' | null

function validateFile(file: File): FileError {
  if (!ACCEPTED_EXTENSIONS.test(file.name)) return 'type'
  if (file.size > MAX_BYTES) return 'size'
  return null
}

export function ResumeDropzone() {
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<FileError>(null)

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploaded, setUploaded] = useState(false)

  const simulateUpload = () => {
    setUploading(true)
    setUploadProgress(0)
    setUploaded(false)

    let progress = 0

    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploading(false)
        setUploaded(true)

        setTimeout(() => {
          navigate(ROUTES.RESULT)
        }, 1200)
      }
    }, 120)
  }

  const applyFile = useCallback((incoming: File | null) => {
    if (!incoming) {
      setFile(null)
      setError(null)
      return
    }

    const validationError = validateFile(incoming)

    if (validationError) {
      setFile(null)
      setError(validationError)
      return
    }

    setError(null)
    setUploaded(false)
    setFile(incoming)
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    dragCounter.current += 1

    if (e.dataTransfer.types.includes('Files')) {
      setDragging(true)
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    dragCounter.current -= 1

    if (dragCounter.current <= 0) {
      dragCounter.current = 0
      setDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()

      dragCounter.current = 0
      setDragging(false)

      const dropped = e.dataTransfer.files[0]

      if (dropped) {
        applyFile(dropped)
      }
    },
    [applyFile],
  )

  const errorMessage =
    error === 'type'
      ? 'Please upload PDF, DOC, or DOCX files only.'
      : error === 'size'
        ? `File must be under ${MAX_SIZE_MB}MB.`
        : null

  return (
    <div className="space-y-6">

      {/* Upload Box */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Upload resume"

        onClick={() => inputRef.current?.click()}

        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}

        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}

        animate={{
          scale: dragging ? 1.02 : 1,
          borderColor: dragging
            ? 'rgba(255,0,110,0.55)'
            : error
              ? 'rgba(239,68,68,0.45)'
              : 'rgba(255,255,255,0.12)',
        }}

        className={[
          'relative overflow-hidden rounded-3xl border-2 border-dashed',
          'bg-white/[0.03] backdrop-blur-xl',
          'p-8 sm:p-12',
          'text-center transition-all duration-300',
          'cursor-pointer',
          'hover:border-rose-500/40',
          'hover:shadow-[0_0_40px_rgba(255,0,110,0.12)]',
          dragging ? 'bg-rose-500/[0.06]' : '',
        ].join(' ')}
      >

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTR}
          className="sr-only"

          onChange={(e) => {
            applyFile(e.target.files?.[0] ?? null)
            e.target.value = ''
          }}
        />

        {/* Glow */}
        <motion.div
          aria-hidden
          animate={{ opacity: dragging ? 1 : 0.3 }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,110,0.14),transparent_65%)]"
        />

        {/* Icon */}
        <motion.div
          animate={{
            y: dragging ? -6 : 0,
            scale: dragging ? 1.08 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 18,
          }}
        >
          <UploadCloud
            className={`mx-auto size-14 ${
              dragging ? 'text-rose-300' : 'text-rose-400'
            }`}
          />
        </motion.div>

        {/* Text */}
        <h3 className="mt-6 text-xl font-semibold text-white">
          {dragging
            ? 'Release to upload your resume'
            : 'Drag & drop your resume'}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          Upload your resume in PDF, DOC, or DOCX format.
          <br />
          Maximum file size: {MAX_SIZE_MB}MB
        </p>

        {/* Upload Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20"
        >
          <UploadCloud size={18} />
          Browse Files
        </motion.div>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}

            className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm text-red-300"
          >
            <AlertCircle className="size-5 shrink-0" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Preview */}
      <AnimatePresence>
        {file && !error && (
          <motion.div
            key={file.name}

            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}

            className="flex items-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/20">
              <FileText className="text-emerald-400" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-emerald-200">
                {file.name}
              </p>

              <p className="text-xs text-emerald-400/80">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            className="space-y-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">
                Uploading resume...
              </span>

              <span className="font-medium text-rose-400">
                {uploadProgress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}

                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success */}
      <AnimatePresence>
        {uploaded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}

            className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4"
          >
            <CheckCircle2 className="size-5 text-emerald-400" />

            <p className="text-sm font-medium text-emerald-300">
              Resume uploaded successfully ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <GlowButton
          variant="primary"
          disabled={!file || uploading}
          onClick={simulateUpload}
        >
          {uploading ? 'Analyzing...' : 'Run AI Analysis'}
        </GlowButton>

        <GlowButton
          variant="secondary"
          onClick={() => {
            setFile(null)
            setError(null)
            setUploaded(false)

            if (inputRef.current) {
              inputRef.current.value = ''
            }
          }}
        >
          Clear File
        </GlowButton>
      </div>
    </div>
  )
}