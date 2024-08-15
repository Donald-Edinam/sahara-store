import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'default', 
    size = 'md', 
    className = '', 
    disabled = false 
}) => {
    const baseClasses = 'btn'
    const variantClasses = {
        default: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        ghost: 'btn-ghost',
        link: 'btn-link',
        outline: 'btn-outline',
    }
    const sizeClasses = {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
    }

    const classes = `
        ${baseClasses} 
        ${variantClasses[variant] || ''} 
        ${sizeClasses[size] || ''} 
        ${className}
    `.trim()

    return (
        <button 
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['default', 'secondary', 'accent', 'ghost', 'link', 'outline']),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
}

export default Button