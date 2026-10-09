"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useAuth } from "@/context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter();
  const auth = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!auth?.login) {
      console.error("Auth Context is not provided");
      return;
    }
    setLoading(true);
    try {
      await auth.login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login gagal. Periksa email dan password Anda",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-8 items-start justify-center px-2 py-4 w-full max-w-[406.5px] mx-auto">
      <div className="flex flex-col gap-1 items-start justify-center leading-[1.2] w-full">
        <h1 className="font-['DM_Sans',sans-serif] font-medium text-[#344054] text-[24px] w-full">
          Login
        </h1>
        <p className="font-['DM_Sans',sans-serif] font-normal text-[#98a2b3] text-[16px] w-full">
          Masukkan kredensial akun untuk masuk ke dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3 items-start w-full">
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            required
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Masukkan password..."
            value={formData.password}
            onChange={handleChange}
            required
            suffix={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="flex items-center justify-center w-5 focus:outline-none text-[#98a2b3] hover:text-[#344054] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon size={16} weight="bold" />
                ) : (
                  <EyeIcon size={16} weight="bold" />
                )}
              </button>
            }
          />
        </div>

        <div className="w-full pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
