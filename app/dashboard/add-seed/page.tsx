import AddSeedForm from "@/components/AddSeedForm"

export default function AddSeed() {
  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-green-100 to-green-200 flex flex-col items-center justify-start py-12 px-4 md:px-20">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-2">
          Add a New Seed
        </h1>
        <p className="text-green-800 text-md md:text-lg">
          Fill the form below to add a new seed with images and status.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-green-100">
        <AddSeedForm />
      </div>
    </div>
  )
}
