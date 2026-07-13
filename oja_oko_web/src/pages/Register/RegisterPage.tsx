import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../layouts/AuthLayout";

import {
  Button,
  Card,
  Input,
} from "../../components/ui";

import { useRegister } from "../../hooks/useRegister";

import {
  registerSchema,
  type RegisterFormData,
} from "../../validators/authSchemas";

interface RegisterPageProps {
  accountType: "buyer" | "farmer";
}

const RegisterPage = ({
  accountType,
}: RegisterPageProps) => {
  const navigate = useNavigate();

  const registerMutation = useRegister(() => {
    navigate(
      accountType === "farmer"
        ? "/login/farmer"
        : "/login/buyer"
    );
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      role: accountType,
    },
  });

  const onSubmit = (
    data: RegisterFormData
  ) => {
    registerMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <Card
        title={
          accountType === "farmer"
            ? "Create Farmer Account"
            : "Create Buyer Account"
        }
        subtitle={
          accountType === "farmer"
            ? "Register your farm and start selling on Oja-Oko Marketplace."
            : "Create your buyer account and start shopping fresh farm products."
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="First Name"
            placeholder="Enter your first name"
            {...register("first_name")}
            error={errors.first_name?.message}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            {...register("last_name")}
            error={errors.last_name?.message}
          />

          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            {...register("phone_number")}
            error={errors.phone_number?.message}
          />

          {/* Hidden account role */}

          <input
            type="hidden"
            {...register("role")}
            value={accountType}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Create a password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </Button>

          <div className="border-t pt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
            </p>

            <Link
              to={
                accountType === "farmer"
                  ? "/login/farmer"
                  : "/login/buyer"
              }
              className="mt-2 inline-block font-semibold text-green-700 hover:underline"
            >
              {accountType === "farmer"
                ? "Farmer Login"
                : "Buyer Login"}
            </Link>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default RegisterPage;