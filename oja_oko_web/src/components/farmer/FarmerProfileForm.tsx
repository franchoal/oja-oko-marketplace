import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  farmerProfileSchema,
  type FarmerProfileFormData,
} from "../../validators/farmerProfileSchema";

import { useFarmerProfile } from "../../hooks/useFarmerProfile";
import { useCreateFarmerProfile } from "../../hooks/useCreateFarmerProfile";
import { useUpdateFarmerProfile } from "../../hooks/useUpdateFarmerProfile";

import {
  Button,
  Input,
} from "../ui";

const FarmerProfileForm = () => {
  const navigate = useNavigate();

  /*
  ==========================================
  Load Existing Profile
  ==========================================
  */

  const {
    data: profile,
    isLoading,
    isError,
  } = useFarmerProfile();

  /*
  ==========================================
  Mutations
  ==========================================
  */

  const createProfile =
    useCreateFarmerProfile(() => {
      navigate(
        "/farmer/dashboard",
        {
          replace: true,
        }
      );
    });

  const updateProfile =
    useUpdateFarmerProfile();

  /*
  ==========================================
  Form
  ==========================================
  */

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<FarmerProfileFormData>({
    resolver: zodResolver(
      farmerProfileSchema
    ),

    defaultValues: {
      farm_name: "",
      farm_location: "",
      farm_description: "",
    },
  });

  /*
  ==========================================
  Populate Existing Profile
  ==========================================
  */

  useEffect(() => {
    if (!profile) return;

    reset({
      farm_name: profile.farm_name,
      farm_location:
        profile.farm_location,
      farm_description:
        profile.farm_description,
    });
  }, [profile, reset]);

  /*
  ==========================================
  Submit
  ==========================================
  */

  const onSubmit = (
    data: FarmerProfileFormData
  ) => {
    /*
    No profile exists

    First-time farmer
    */

    if (isError || !profile) {
      createProfile.mutate(data);
      return;
    }

    /*
    Existing farmer

    Update profile
    */

    updateProfile.mutate(data);
  };

  /*
  ==========================================
  Loading
  ==========================================
  */

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow">
        <p className="text-center text-gray-600">
          Loading farm profile...
        </p>
      </div>
    );
  }

  /*
  ==========================================
  UI
  ==========================================
  */

  const isCreating =
    isError || !profile;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl bg-white p-8 shadow"
    >
      <Input
        label="Farm Name"
        placeholder="e.g. Green Valley Farms"
        {...register("farm_name")}
        error={
          errors.farm_name?.message
        }
      />

      <Input
        label="Farm Location"
        placeholder="e.g. Abeokuta, Ogun State"
        {...register("farm_location")}
        error={
          errors.farm_location
            ?.message
        }
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Farm Description
        </label>

        <textarea
          {...register(
            "farm_description"
          )}
          rows={5}
          placeholder="Tell buyers about your farm..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
        />

        {errors.farm_description && (
          <p className="mt-2 text-sm text-red-500">
            {
              errors
                .farm_description
                .message
            }
          </p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={
          createProfile.isPending ||
          updateProfile.isPending
        }
      >
        {createProfile.isPending ||
        updateProfile.isPending
          ? isCreating
            ? "Creating Farm Profile..."
            : "Updating Profile..."
          : isCreating
          ? "Create Farm Profile"
          : "Update Farm Profile"}
      </Button>
    </form>
  );
};
export default FarmerProfileForm;