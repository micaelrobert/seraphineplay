"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface GameButtonProps {
  icon: LucideIcon
  title: string
  description?: string
  onClick: () => void
  color?: string
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

export function GameButton({
  icon: Icon,
  title,
  description,
  onClick,
  color = "bg-blue-100 hover:bg-blue-200 text-blue-700",
  size = "md",
  disabled = false,
}: GameButtonProps) {
  const sizeClasses = {
    sm: "p-4 text-sm",
    md: "p-6 text-base",
    lg: "p-8 text-lg",
  }

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <motion.button
      className={`${color} ${sizeClasses[size]} rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className={`${iconSizes[size]} mx-auto mb-2`} />
      <h3 className="font-bold mb-1">{title}</h3>
      {description && <p className="text-xs opacity-80">{description}</p>}
    </motion.button>
  )
}
