import React from 'react'

const Button = ({
    type,
    label,
    disabled,
    className,
    onClick,
    Icons,
    rIcons
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`tw-px-6 tw-text-center tw-py-2.5    tw-flex tw-items-center tw-justify-center tw-gap-1 tw-bg-button-gradient tw-text-white ${className}`}
      disabled={disabled}
    >
      {Icons} {label} {rIcons}
    </button>
  )
}

export default Button
