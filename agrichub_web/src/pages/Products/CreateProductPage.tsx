import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm";

import { useCreateProduct } from "../../hooks/useCreateProduct";

import type {
  ProductFormData,
} from "../../validators/productSchemas";



const CreateProductPage = () => {


  const navigate = useNavigate();



  const {
    mutate,
    isPending,

  } = useCreateProduct(() => {


    console.log(
      "PRODUCT CREATED SUCCESSFULLY"
    );


    navigate(
      "/farmer/dashboard",
      {
        replace: true,
      }
    );


  });





  const handleSubmit = (
    data: ProductFormData
  ) => {


    console.log(
      "CREATE PAGE RECEIVED"
    );


    console.log(data);



    mutate(data);


  };





  return (

    <main className="mx-auto max-w-3xl px-6 py-8">


      <h1 className="mb-6 text-3xl font-bold">

        Create Product

      </h1>




      <div className="rounded-2xl bg-white p-8 shadow">


        <ProductForm

          onSubmit={handleSubmit}

          isSubmitting={isPending}

        />


      </div>


    </main>

  );

};



export default CreateProductPage;