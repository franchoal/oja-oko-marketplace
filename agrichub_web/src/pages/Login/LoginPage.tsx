import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthLayout from "../../layouts/AuthLayout";

import {
  Button,
  Card,
  Input,
} from "../../components/ui";

import {
  loginSchema,
  type LoginFormData,
} from "../../validators/authSchemas";

import { useLogin } from "../../hooks/useLogin";


type AccountType = "buyer" | "farmer";


interface LoginPageProps {
  accountType: AccountType;
}


const LoginPage = ({
  accountType,
}: LoginPageProps) => {


  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginFormData>({

    resolver: zodResolver(
      loginSchema
    ),

  });



  /*
  ==========================================
  Login Mutation

  Role is determined from backend
  response, not this page prop.

  ==========================================
  */


  const {
    mutate,
    isPending,
  } = useLogin();



  /*
  ==========================================
  Submit
  ==========================================
  */


  const onSubmit = (
    data: LoginFormData
  ) => {

    mutate(data);

  };



  return (

    <AuthLayout>

      <Card

        title={
          accountType === "farmer"
            ? "Farmer Login"
            : "Buyer Login"
        }


        subtitle={
          accountType === "farmer"
            ? "Sign in to manage your farm, products, orders and sales."
            : "Sign in to browse and purchase fresh farm products."
        }

      >


        <form

          onSubmit={
            handleSubmit(onSubmit)
          }

          className="space-y-5"

        >


          <Input

            type="email"

            label="Email Address"

            placeholder="Enter your email"

            {...register("email")}

            error={
              errors.email?.message
            }

          />



          <Input

            type="password"

            label="Password"

            placeholder="Enter your password"

            {...register("password")}

            error={
              errors.password?.message
            }

          />



          <Button

            type="submit"

            disabled={
              isPending
            }

          >

            {
              isPending

              ? "Signing In..."

              : accountType === "farmer"

              ? "Sign In as Farmer"

              : "Sign In as Buyer"
            }


          </Button>



          <div className="border-t pt-6 text-center">


            <p className="text-sm text-gray-600">

              Don't have an account?

            </p>



            <Link

              to={
                accountType === "farmer"

                  ? "/register/farmer"

                  : "/register/buyer"
              }

              className="mt-2 inline-block font-semibold text-green-700 hover:underline"

            >

              {
                accountType === "farmer"

                ? "Create Farmer Account"

                : "Create Buyer Account"
              }

            </Link>


          </div>




          {
            accountType === "farmer" && (

              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm">


                <p className="font-semibold text-green-700">

                  Farmer Portal

                </p>


                <p className="mt-2 text-gray-600">

                  Complete your farm profile,
                  list products, manage orders
                  and monitor your business
                  performance.

                </p>


              </div>

            )
          }




          {
            accountType === "buyer" && (

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm">


                <p className="font-semibold text-blue-700">

                  Buyer Marketplace

                </p>


                <p className="mt-2 text-gray-600">

                  Browse fresh agricultural
                  products from trusted farmers
                  across Nigeria.

                </p>


              </div>

            )
          }



        </form>


      </Card>


    </AuthLayout>

  );

};


export default LoginPage;