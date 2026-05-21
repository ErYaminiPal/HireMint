import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, FileText, UploadCloud } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/paths'
import { GlowButton } from '../ui/GlowButton'

const MAX_SIZE_MB = 10
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024
const ACCEPTED_EXTENSIONS = /\.(pdf|doc|docx)$/i
const ACCEPT_ATTR = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

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
      if (dropped) applyFile(dropped)
    },
    [applyFile],
  )

  const errorMessage =
    error === 'type'
      ? 'Please upload a PDF, DOC, or DOCX file.'
      : error === 'size'
        ? `File must be ${MAX_SIZE_MB}MB or smaller.`
        : null

  return (
    <div className="space-y-6">
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Upload resume. Drag and drop or press Enter to browse."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        animate={{
          scale: dragging ? 1.01 : 1,
          borderColor: dragging
            ? 'rgba(255,0,110,0.55)'
            : error
              ? 'rgba(239,68,68,0.45)'
              : 'rgba(255,255,255,0.12)',
        }}
        className={[
          'card-3d-lift relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed bg-white/[0.02] p-10 text-center transition-colors sm:p-14',
          dragging ? 'bg-rose-500/[0.06]' : '',
        ].join(' ')}
      >
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

        <motion.div
          aria-hidden
          animate={{ opacity: dragging ? 1 : 0.35 }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,110,0.14),transparent_65%)]"
        />

        <motion.div
          animate={{ y: dragging ? -6 : 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <UploadCloud
            className={`mx-auto size-12 ${dragging ? 'text-rose-300' : 'text-rose-400'}`}
          />
        </motion.div>

        <p className="relative mt-6 text-lg font-semibold text-white">
          {dragging ? 'Release to upload' : 'Drag and drop your resume here'}
        </p>
        <p className="relative mt-2 text-sm text-gray-400">
          or click to browse · PDF, DOC, DOCX · max {MAX_SIZE_MB}MB
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {errorMessage && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            role="alert"
          >
            <AlertCircle className="size-5 shrink-0" />
            {errorMessage}
          </motion.div>
        )}

        {file && !error && (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
          >
            <FileText className="size-5 shrink-0 text-emerald-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-emerald-200">{file.name}</p>
              <p className="text-xs text-emerald-400/80">
                {(file.size / 1024 / 1024).toFixed(2)} MB · Ready to analyze
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-4">
        <GlowButton
          variant="primary"
          disabled={!file}
          onClick={() => navigate(ROUTES.RESULT)}
        >
          Run AI analysis
        </GlowButton>
        <GlowButton
          variant="secondary"
          onClick={() => {
            setFile(null)
            setError(null)
            if (inputRef.current) inputRef.current.value = ''
          }}
        >
          Clear file
        </GlowButton>
      </div>
    </div>
  )
}
