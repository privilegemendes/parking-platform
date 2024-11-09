import { FC, HTMLAttributes, SyntheticEvent, useEffect, useState } from "react";

import { EyeIcon, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { cn } from "~/lib/utils";
import { useAuth } from "~/contexts/authentication-provider";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { loginWithPasswordDto, LoginWithPasswordDto } from "~/types/user";

type Props = HTMLAttributes<HTMLDivElement>;

export const LoginForm: FC<Props> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginWithPasswordDto>({
    resolver: zodResolver(loginWithPasswordDto),
  });

  const onSubmit = async (data: LoginWithPasswordDto) => {
    try {
      setIsLoading(true); // Start loading spinner
      await login(data.email, data.password);
    } catch (error) {
      console.error("Invalid credentials or server error.", error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  // Navigate to home page when isAuthenticated becomes true
  useEffect(() => {
    void router.invalidate();
    if (isAuthenticated) {
      void navigate({ to: "/dashboard" });
    } else {
      void navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate, router]);

  const togglePasswordVisibility = (event: SyntheticEvent) => {
    event.preventDefault();
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              {...register("password")}
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePasswordVisibility}
              className="absolute right-0.5 top-1/2 transform -translate-y-1/2"
            >
              {passwordVisible ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <Button disabled={isLoading}>
            {/*{isLoading && (*/}
            {/*  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />*/}
            {/*)}*/}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
};
