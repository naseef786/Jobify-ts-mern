import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  styles?: string;
  register: UseFormRegisterReturn;
}

const TextInput = forwardRef(
  (
    { type, placeholder, styles, label, error, ...rest }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col mt-2">
        <p className="text-gray-600 text-sm mb-1">{label}</p>

        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
        
          className={`rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 ${styles}`}
          {...rest}
          aria-invalid={error ? "true" : "false"}
        />
        {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);

export default TextInput;
