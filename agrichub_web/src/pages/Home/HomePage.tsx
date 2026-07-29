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
  Globe2,
  BarChart3,
} from "lucide-react";

import {
  heroFarm,
  vegetables,
  fruits,
  grains,
  livestock,
} from "../../assets/images";

const Sectiontitle = ({
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

  {/* Background */}

  <img
    src={heroFarm}
    alt="AgricHub Africa"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Overlay */}

  <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/80 to-green-700/50" />

  {/* Decorative Blurs */}

  <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />

  <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl" />

  <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-20">

    <div className="grid w-full items-center gap-20 lg:grid-cols-2">

      {/* ================= LEFT ================= */}

      <div>

        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
          🌍 Africa's Smart Agricultural Ecosystem
        </span>

        <h1 className="mt-8 text-5xl font-black leading-tight text-white lg:text-7xl">

          Building the

          <span className="block text-yellow-300">
            Future of African Agriculture
          </span>

          One Farmer at a Time

        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-green-50">

          AgricHub Africa is a digital agricultural ecosystem connecting
          farmers, buyers, processors, cooperatives, agribusinesses and
          financial partners through one intelligent platform.

          <br /><br />

          Buy fresh produce directly from verified farmers, grow your
          agricultural business, discover new markets, and unlock the
          opportunities shaping the future of African agriculture.

        </p>

        {/* CTA */}

        <div className="mt-10 flex flex-wrap gap-5">

          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-green-700 shadow-xl transition hover:-translate-y-1"
          >
            Explore Marketplace

            <ArrowRight size={18} />
          </Link>

          <Link
            to="/farmer"
            className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-green-700"
          >
            Join as Farmer
          </Link>

        </div>

        {/* Platform Highlights */}

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">

          <div>
            <h3 className="text-4xl font-black text-white">
              500+
            </h3>

            <p className="mt-2 text-green-100">
              Farmers
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-white">
              5K+
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
              Nigerian States
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-white">
              Africa
            </h3>

            <p className="mt-2 text-green-100">
              Expansion Vision
            </p>
          </div>

        </div>

      </div>

      {/* ================= RIGHT ================= */}

      <div className="hidden lg:block">

        <div className="rounded-3xl bg-white/95 p-10 shadow-2xl backdrop-blur">

          <ShoppingBasket
            size={72}
            className="text-green-600"
          />

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            More Than A Marketplace
          </h2>

          <p className="mt-4 leading-8 text-gray-600">

            AgricHub Africa provides farmers and agribusinesses with
            powerful digital tools designed to simplify trading,
            improve visibility, increase income and create sustainable
            agricultural growth across Africa.

          </p>

          <div className="mt-8 space-y-4">

            {[
              "Verified Farmers & Buyers",
              "Nationwide Agricultural Marketplace",
              "Business Management Tools",
              "Digital Farm Visibility",
              "Secure Transactions",
              "Built for Africa",
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
      {/* ========================================= */}
{/* EXPLORE AGRICULTURAL CATEGORIES */}
{/* ========================================= */}

<section className="bg-slate-50 py-24">

  <div className="mx-auto max-w-7xl px-6">

    <Sectiontitle
      title="Explore Africa's Agricultural Marketplace"
      subtitle="From fresh farm produce to livestock and essential agricultural commodities, discover quality products supplied by verified farmers and agribusinesses across the AgricHub Africa ecosystem."
    />

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

      {[
        {
          image: vegetables,
          title: "Fresh Vegetables",
          description: "Healthy vegetables harvested directly from trusted farms.",
        },
        {
          image: fruits,
          title: "Fresh Fruits",
          description: "Seasonal fruits sourced from verified growers.",
        },
        {
          image: grains,
          title: "Grains & Cereals",
          description: "Rice, maize, beans and staple crops for homes and businesses.",
        },
        {
          image: livestock,
          title: "Livestock",
          description: "Quality livestock and animal products from trusted farmers.",
        },
      ].map((category) => (

        <Link
          key={category.title}
          to="/products"
          className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >

          <div className="relative h-64 overflow-hidden">

            <img
              src={category.image}
              alt={category.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5">

              <span className="rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-green-700">
                Explore
              </span>

            </div>

          </div>

          <div className="p-7">

            <h3 className="text-2xl font-bold text-gray-900">
              {category.title}
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              {category.description}
            </p>

            <div className="mt-6 flex items-center font-semibold text-green-700 transition group-hover:translate-x-1">

              Browse Products

              <ArrowRight
                size={18}
                className="ml-2"
              />

            </div>

          </div>

        </Link>

      ))}

    </div>

    {/* Bottom Callout */}

    <div className="mt-20 rounded-3xl bg-white p-10 text-center shadow-lg">

      <h3 className="text-3xl font-bold text-gray-900">
        Thousands of Agricultural Products. One Trusted Platform.
      </h3>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">

        AgricHub Africa brings together farmers, cooperatives, processors,
        distributors, retailers, and buyers in one digital marketplace—
        making agricultural trade more transparent, accessible, and profitable.

      </p>

      <Link
        to="/products"
        className="mt-8 inline-flex items-center rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
      >
        Explore Marketplace

        <ArrowRight
          size={18}
          className="ml-2"
        />
      </Link>

    </div>

  </div>

</section>
      {/* ========================================= */}
{/* HOW AGRICHUB AFRICA WORKS */}
{/* ========================================= */}

<section className="py-24 bg-white">

  <div className="mx-auto max-w-7xl px-6">

    <Sectiontitle
      title="How AgricHub Africa Works"
      subtitle="A simple digital ecosystem connecting farmers, buyers, and agricultural opportunities across Africa."
    />

    <div className="grid gap-10 md:grid-cols-3">

      {[
        {
          icon: Users,
          title: "Join the Ecosystem",
          text:
            "Create your AgricHub account as a farmer or buyer and become part of Africa's growing digital agricultural community.",
        },
        {
          icon: Search,
          title: "Discover & Connect",
          text:
            "Browse verified farmers, quality agricultural products, and trusted opportunities while building lasting business relationships.",
        },
        {
          icon: ShoppingBasket,
          title: "Trade & Grow",
          text:
            "Buy, sell, manage orders, expand your reach, and grow your agricultural business through one powerful digital platform.",
        },
      ].map((step, index) => {

        const Icon = step.icon;

        return (

          <div
            key={step.title}
            className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

              <Icon
                size={38}
                className="text-green-700"
              />

            </div>

            <div className="mt-8">

              <span className="rounded-full bg-green-50 px-4 py-1 text-sm font-bold text-green-700">
                STEP {index + 1}
              </span>

              <h3 className="mt-5 text-2xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-5 leading-8 text-gray-600">
                {step.text}
              </p>

            </div>

          </div>

        );

      })}

    </div>

    {/* Bottom Statement */}

    <div className="mx-auto mt-20 max-w-4xl rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-10 text-center text-white shadow-xl">

      <h3 className="text-3xl font-bold">
        One Platform. Endless Agricultural Opportunities.
      </h3>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-green-100">

        AgricHub Africa empowers farmers with digital tools,
        gives buyers direct access to trusted agricultural products,
        and creates stronger connections that drive sustainable
        agricultural growth across Africa.

      </p>

    </div>

  </div>

</section>
     {/* ========================= */}
{/* WHY AGRICHUB AFRICA */}
{/* ========================= */}

<section className="bg-slate-50 py-28">

  <div className="mx-auto max-w-7xl px-6">

    <Sectiontitle
      title="Why AgricHub Africa?"
      subtitle="Building the Digital Infrastructure for African Agriculture."
    />

    <p className="mx-auto mb-16 max-w-4xl text-center text-lg leading-8 text-gray-600">
      AgricHub Africa is more than an online marketplace.
      We are building one connected ecosystem where farmers,
      agribusinesses, logistics providers, financial institutions,
      governments, researchers and consumers collaborate through
      technology to transform agriculture across Africa.
    </p>

    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {[
        {
          icon: Leaf,
          title: "Digital Agricultural Marketplace",
          text: "Buy and sell fresh agricultural produce directly from verified farmers while reducing unnecessary middlemen.",
        },

        {
          icon: TrendingUp,
          title: "Farmer Business Suite",
          text: "Powerful digital tools for inventory management, pricing, customer management, analytics and business growth.",
        },

        {
          icon: Users,
          title: "Integrated Logistics",
          text: "Connecting farmers with reliable transportation and delivery partners to move produce efficiently.",
        },

        {
          icon: ShieldCheck,
          title: "Financial Inclusion",
          text: "Expanding access to digital payments, agricultural financing and future credit opportunities for farmers.",
        },

        {
          icon: BarChart3,
          title: "Agricultural Intelligence",
          text: "Market insights, production trends and real-time analytics that support smarter agricultural decisions.",
        },

        {
          icon: Globe2,
          title: "Built for Africa",
          text: "Designed to scale across every African country while empowering local agricultural communities through technology.",
        },

      ].map((feature) => {

        const Icon = feature.icon;

        return (

          <div
            key={feature.title}
            className="group rounded-3xl border border-transparent bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl"
          >

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 transition group-hover:bg-green-600">

              <Icon
                size={34}
                className="text-green-700 transition group-hover:text-white"
              />

            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              {feature.title}
            </h3>

            <p className="mt-5 leading-8 text-gray-600">
              {feature.text}
            </p>

          </div>

        );

      })}

    </div>

    {/* Vision Banner */}

    <div className="mt-20 overflow-hidden rounded-[32px] bg-gradient-to-r from-green-800 via-green-700 to-green-600 p-12 text-white shadow-2xl">

      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">

        <div className="max-w-3xl">

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            OUR VISION
          </span>

          <h3 className="mt-6 text-4xl font-black">
            Building Africa's Largest Digital Agricultural Ecosystem
          </h3>

          <p className="mt-6 text-lg leading-8 text-green-100">
            Our mission is to connect millions of farmers, agribusinesses,
            financial institutions, logistics providers and consumers
            through one intelligent platform that drives food security,
            economic growth and sustainable agriculture across Africa.
          </p>

        </div>

        <Link
          to="/about"
          className="rounded-2xl bg-white px-8 py-4 font-bold text-green-700 transition hover:-translate-y-1 hover:bg-green-50"
        >
          Learn More About AgricHub
        </Link>

      </div>

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

          <Sectiontitle
            title="Helping farmers Build Profitable Agricultural Business"
            subtitle="AgricHub-Africa gives farmers more than market access. 
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

          <Sectiontitle
            title="Built For Farmers, Trusted by Buyers"
            subtitle="Building confidence in agricultural commerce across Nigeria."
          />

          <div className="grid gap-8 lg:grid-cols-3">

            {[
              {
                name: "Adebayo",
                role: "Farmer • Ogun State",
                text:
                  "AgricHub-Africa has helped me reach customers beyond my local market and increase my sales.",
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
{/* FINAL CALL TO ACTION */}
{/* ========================================= */}

<section className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 py-28">

  <div className="mx-auto max-w-5xl px-6 text-center text-white">

    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
      🌍 Building Africa's Agricultural Future
    </span>

    <h2 className="mt-8 text-5xl font-black leading-tight lg:text-6xl">

      Join the Digital Revolution

      <br />

      Transforming Agriculture Across Africa

    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100">

      Whether you're a farmer looking to expand your market,
      a buyer searching for quality agricultural products,
      or a partner committed to strengthening Africa's food systems,
      AgricHub Africa provides the technology, marketplace, and network
      to help you succeed.

    </p>

    <div className="mt-14 flex flex-wrap justify-center gap-5">

      <Link
        to="/register/farmer"
        className="rounded-xl bg-white px-8 py-4 font-semibold text-green-700 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
      >
        Become a Farmer Partner
      </Link>

      <Link
        to="/products"
        className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-green-700"
      >
        Explore Marketplace
      </Link>

    </div>

    <div className="mt-14 grid gap-8 text-left text-green-100 md:grid-cols-3">

      <div>
        <h3 className="text-2xl font-bold text-white">
          🌾 Farmers
        </h3>

        <p className="mt-3 leading-7">
          Reach more customers, manage your farm digitally, and grow a profitable agricultural business.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white">
          🛒 Buyers
        </h3>

        <p className="mt-3 leading-7">
          Access fresh, verified agricultural products directly from trusted farmers across Nigeria.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white">
          🤝 Partners
        </h3>

        <p className="mt-3 leading-7">
          Collaborate with us to accelerate innovation, food security, and sustainable agriculture throughout Africa.
        </p>
      </div>

    </div>

  </div>

</section>

    </main>

  );

};

export default HomePage;
