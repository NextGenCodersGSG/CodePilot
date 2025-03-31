"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import withMotion from "@/HOC/withMotion";

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name"
> & {
  name: string;
  label?: string;
  isPassword?: boolean;
};

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  isPassword = false,
  ...rest
}) => {
  const [field, meta] = useField<string>(name);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <Label htmlFor={name} className="my-2 text-[#F2F2F2]">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          id={name}
          {...field}
          {...rest}
          type={isPassword ? (showPassword ? "text" : "password") : rest.type}
          className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] focus:border-[#003A61] focus:ring-[#003A61]/30"
        />
        {isPassword && (
          <div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-[#B3B3B3] hover:text-[#F2F2F2] hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
};
const MotionTextField = withMotion(TextField);

export default MotionTextField;
