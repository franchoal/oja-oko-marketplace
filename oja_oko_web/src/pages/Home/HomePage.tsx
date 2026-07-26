import { Link } from "react-router-dom";

import {
  ArrowRight,
  Leaf,
  ShoppingBasket,
  ShieldCheck,
  Users,
  TrendingUp,
  CheckCircle2,
  Search,
} from "lucide-react";

import {
  heroFarm,
  vegetables,
  fruits,
  grains,
  livestock,
} from "../../assets/images";

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="mx-auto mb-12 max-w-2xl text-center">
    <h2 className="text-4xl font-bold text-gray-900">
      {title}
    </h2>

    <p className="mt-4 text-lg text-gray-600">
      {subtitle}
    </p>
  </div>
);

const HomePage = () => {
  return (
    <main className="bg-white">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="relative overflow-hidden">

        {/* Hero Background Image */}

        <img
          src={heroFarm}
          alt="Nigerian Farmers"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/75 to-green-700/40" />

        {/* Decorative Blur */}

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-green-400/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-20">

          <div className="grid w-full items-center gap-20 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
                🇳🇬 Nigeria's Digital Agricultural Marketplace
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight text-white lg:text-7xl">

                Connecting Farmers with

                <span className="block text-yellow-300">
                   Markets
                </span>

                Empowering Agriculture Through Technology

              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-green-50">

               Oja-Oko connects verified farmers directly with households, retailers, restaurants,
               hotels, processors, and bulk buyers across Nigeria. More than a marketplace, 
               we provide the digital tools farmers need to sell, manage, 
               and grow profitable agricultural businesses.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-green-700 shadow-xl transition hover:-translate-y-1"
                >
                  Browse Marketplace

                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/farmer"
                  className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-green-700"
                >
                  Sell Your Produce
                </Link>

              </div>

              {/* Stats */}

              <div className="mt-16 grid grid-cols-3 gap-8">

                <div>
                  <h3 className="text-4xl font-black text-white">
                    100+
                  </h3>

                  <p className="mt-2 text-green-100">
                    Verified Farmers
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-white">
                    1,000+
                  </h3>

                  <p className="mt-2 text-green-100">
                    Products
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-white">
                    36
                  </h3>

                  <p className="mt-2 text-green-100">
                    States
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="hidden lg:block">

              <div className="rounded-3xl bg-white/95 p-10 shadow-2xl backdrop-blur">

                <ShoppingBasket
                  size={72}
                  className="text-green-600"
                />

                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  Fresh Produce Delivered
                </h2>

                <p className="mt-4 leading-8 text-gray-600">

                  Shop vegetables, grains, fruits, livestock products and more
                  directly from verified farmers across Nigeria.

                </p>

                <div className="mt-8 space-y-4">

                  {[
                    "Verified Farmers",
                    "Secure Marketplace",
                    "Business Growth Tools",
                    "Nationwide Reach",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={20}
                        className="text-green-600"
                      />

                      <span className="text-gray-700">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* ========================= */}
      {/* CATEGORIES */}
      {/* ========================= */}

      <section className="bg-gray-50 py-24">

        <div className="mx-auto max-w-7xl px-6">

          <SectionTitle
            title="Browse Popular Categories"
            subtitle="Explore quality agricultural products from verified farmers across Nigeria, 
            sourced with transparency and delivered through a trusted digital marketplace."
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                image: vegetables,
                title: "Vegetables",
              },
              {
                image: fruits,
                title: "Fruits",
              },
              {
                image: grains,
                title: "Grains",
              },
              {
                image: livestock,
                title: "Livestock",
              },
            ].map((category) => (

              <Link
                key={category.title}
                to="/products"
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                <div className="h-64 overflow-hidden">

                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Discover quality {category.title.toLowerCase()} from verified
                    farmers.
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* ========================= */}
      {/* HOW IT WORKS */}
      {/* ========================= */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <SectionTitle
            title="How Oja-Oko Works for Farmers & Buyers"
            subtitle="Whether you're buying fresh produce or growing your agricultural business, Oja-Oko makes every step simple."
          />

          <div className="grid gap-10 md:grid-cols-3">

            {[
              {
                icon: Search,
                title: "Discover Trusted Farmers",
                text: "Explore hundreds of fresh agricultural products from verified farmers.",
              },
              {
                icon: Users,
                title: "Connect With Farmers",
                text: "Purchase directly from trusted farmers with transparent pricing.",
              },
              {
                icon: ShoppingBasket,
                title: "Order With Confidence",
                text: "Place orders quickly and manage everything from your account.",
              },
            ].map((step, index) => {

              const Icon = step.icon;

              return (

                <div
                  key={step.title}
                  className="rounded-3xl bg-white p-10 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

                    <Icon
                      size={38}
                      className="text-green-600"
                    />

                  </div>

                  <div className="mt-6">

                    <span className="text-sm font-semibold text-green-600">
                      STEP {index + 1}
                    </span>

                    <h3 className="mt-2 text-2xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-7 text-gray-600">
                      {step.text}
                    </p>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      {/* ========================= */}
      {/* WHY CHOOSE US */}
      {/* ========================= */}

      <section className="bg-gray-50 py-24">

        <div className="mx-auto max-w-7xl px-6">

          <SectionTitle
            title="Why Nigerians Choose Oja-Oko"
            subtitle="Built specifically for the Nigerian agricultural ecosystem."
          />

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                icon: Leaf,
                title: "Verified Marketplace",
                text: "Farm-fresh products harvested and supplied directly by trusted farmers.",
              },
              {
                icon: ShieldCheck,
                title: "Verified Farmers",
                text: "Every seller is verified before listing products.",
              },
              {
                icon: Users,
                title: "Nationwide Network",
                text: "Connecting farmers and buyers across every region of Nigeria",
              },
              {
                icon: TrendingUp,
                title: "Farmer Business Platform",
                text: "Helping farmers grow profitable business through technology",
              },
            ].map((feature) => {

              const Icon = feature.icon;

              return (

                <div
                  key={feature.title}
                  className="rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
                >

                  <Icon
                    size={48}
                    className="text-green-600"
                  />

                  <h3 className="mt-6 text-2xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {feature.text}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>
            {/* ========================================= */}
      {/* FARMER SUCCESS */}
      {/* ========================================= */}

      <section className="relative overflow-hidden py-28">

        <img
          src={heroFarm}
          alt="Farmers"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-green-900/80" />

        <div className="relative mx-auto max-w-7xl px-6">

          <SectionTitle
            title="Helping farmers Build Profitable Agricultural Business"
            subtitle="Oja-Oko gives farmers more than market access. 
            We provide the digital foundation for sustainable agricultural growth."
          />

          <div className="mt-16 grid gap-10 text-center text-white md:grid-cols-4">

            {[
              {
                number: "100+",
                label: "Registered Farmers",
              },
              {
                number: "1,000+",
                label: "Products Listed",
              },
              {
                number: "36",
                label: "States Covered",
              },
              {
                number: "24/7",
                label: "Marketplace Access",
              },
            ].map((item) => (

              <div key={item.label}>

                <h3 className="text-5xl font-black text-yellow-300">
                  {item.number}
                </h3>

                <p className="mt-3 text-lg text-green-100">
                  {item.label}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* TESTIMONIALS */}
      {/* ========================================= */}

      <section className="bg-gray-50 py-24">

        <div className="mx-auto max-w-7xl px-6">

          <SectionTitle
            title="Built For Farmers, Trusted by Buyers"
            subtitle="Building confidence in agricultural commerce across Nigeria."
          />

          <div className="grid gap-8 lg:grid-cols-3">

            {[
              {
                name: "Adebayo",
                role: "Farmer • Ogun State",
                text:
                  "Oja-Oko has helped me reach customers beyond my local market and increase my sales.",
              },
              {
                name: "Chioma",
                role: "Buyer • Lagos",
                text:
                  "Buying fresh produce directly from verified farmers has never been easier.",
              },
              {
                name: "Yusuf",
                role: "Farmer • Kaduna",
                text:
                  "Managing products and receiving customer orders online has transformed my business.",
              },
            ].map((item) => (

              <div
                key={item.name}
                className="rounded-3xl bg-white p-10 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="mb-6 flex text-yellow-500">

                  ⭐⭐⭐⭐⭐

                </div>

                <p className="leading-8 text-gray-600">

                  "{item.text}"

                </p>

                <div className="mt-8">

                  <h4 className="font-bold text-gray-900">

                    {item.name}

                  </h4>

                  <p className="text-sm text-gray-500">

                    {item.role}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* FINAL CTA */}
      {/* ========================================= */}

      <section className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 py-28">

        <div className="mx-auto max-w-4xl px-6 text-center text-white">

          <h2 className="text-5xl font-black leading-tight">

            Join Nigeria's Fastest Growing

            <br />

            Agricultural Marketplace

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100">

           Whether you're a farmer looking to reach larger markets 
           or a buyer searching for trusted agricultural products,
           Oja-Oko provides the platform to connect, trade, and grow.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              to="/register/farmer"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-green-700 transition hover:-translate-y-1 hover:shadow-xl"
            >
              Become a Farmer
            </Link>

            <Link
              to="/products"
              className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-green-700"
            >
              Shop Products
            </Link>

          </div>

        </div>

      </section>

    </main>

  );

};

export default HomePage;