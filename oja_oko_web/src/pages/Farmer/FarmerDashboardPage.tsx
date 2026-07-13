import { Link, Navigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useFarmerProducts } from "../../hooks/useFarmerProducts";


const FarmerDashboardPage = () => {


  const user = useAuthStore(
    (state) => state.user
  );


  const {
    data: products = [],
    isLoading,
  } = useFarmerProducts();



  /*
  Safety check:
  Only farmers should see this page
  */

  if (
    !user ||
    user.role !== "farmer"
  ) {

    return (
      <Navigate
        to="/products"
        replace
      />
    );

  }




  return (

    <main className="mx-auto max-w-7xl px-6 py-8">



      {/* Header */}

      <div className="mb-10">


        <h1 className="text-4xl font-bold">

          Welcome,{" "}

          {
            user.first_name ||
            "Farmer"
          }

        </h1>



        <p className="mt-2 text-gray-600">

          Manage your farm,
          products and marketplace activities.

        </p>


      </div>





      {/* Actions */}

      <div className="mb-10 grid gap-5 md:grid-cols-3">



        <Link

          to="/farmer/products/create"

          className="rounded-xl bg-green-600 p-6 text-white shadow transition hover:bg-green-700"

        >

          <h2 className="text-xl font-semibold">

            Add Product

          </h2>


          <p className="mt-2 text-sm text-green-100">

            List a new farm product for sale.

          </p>


        </Link>





        <Link

          to="/farmer/profile"

          className="rounded-xl border border-green-600 bg-white p-6 shadow transition hover:bg-green-50"

        >

          <h2 className="text-xl font-semibold text-green-700">

            Farm Profile

          </h2>


          <p className="mt-2 text-sm text-gray-600">

            Update your farm information.

          </p>


        </Link>





        <div className="rounded-xl border bg-white p-6 shadow">


          <h2 className="text-xl font-semibold">

            Analytics

          </h2>


          <p className="mt-2 text-sm text-gray-500">

            Coming soon...

          </p>


        </div>



      </div>







      {/* Products */}


      <section className="rounded-xl bg-white p-8 shadow">


        <div className="mb-6 flex items-center justify-between">


          <h2 className="text-2xl font-semibold">

            My Products

          </h2>



          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">

            {products.length}{" "}

            Product
            {
              products.length !== 1
                ? "s"
                : ""
            }

          </span>


        </div>





        {
          isLoading ? (

            <p>
              Loading products...
            </p>


          ) : products.length === 0 ? (


            <div className="py-16 text-center">


              <p className="mb-6 text-gray-500">

                You haven't added any products yet.

              </p>




              <Link

                to="/farmer/products/create"

                className="inline-block rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"

              >

                Add Your First Product

              </Link>


            </div>



          ) : (


            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


              {
                products.map(
                  (product) => (

                    <div

                      key={product.id}

                      className="rounded-xl border p-5 transition hover:shadow-md"

                    >


                      <h3 className="text-lg font-semibold">

                        {product.name}

                      </h3>



                      <p className="mt-2 text-sm text-gray-500">

                        {product.category_name}

                      </p>



                      <p className="mt-4 font-bold text-green-700">

                        ₦{product.price}

                      </p>



                      <p className="mt-2 text-sm text-gray-500">

                        {product.quantity} {product.unit}

                      </p>



                    </div>

                  )
                )
              }


            </div>


          )
        }



      </section>



    </main>

  );

};


export default FarmerDashboardPage;