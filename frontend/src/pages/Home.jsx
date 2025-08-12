export default function HomePage() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-lg leading-7">
          National Statistics Office of India under Ministry of Statistics and Programme Implementation follows policy
          of open access to microdata from its extensive surveys and censuses. Our web-based cataloguing portal,
          powered by the National Data Archive (NADA) software from the International Household Survey Network (IHSN),
          provides researchers, policymakers, and the public with seamless access to detailed survey metadata and datasets.
          This gateway to official statistics is designed to support evidence-based research and informed decision-making
          through transparent data dissemination.
        </p>

        <p className="text-lg leading-7 mt-4">
          This system serves as a portal for researchers to browse, search, and download relevant census or survey
          documents and metadata. The Microdata Archive provides web-based access to the complete metadata and unit
          level data of over 178 surveys and censuses.
        </p>
      </section>

      {/* Survey Links */}
      <section className="bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-blue-700 font-medium">
          <a href="#" className="hover:underline">Annual Survey of Industries</a>
          <a href="#" className="hover:underline">Index of Industrial Production</a>
          <a href="#" className="hover:underline">Household Consumption Expenditure</a>
          <a href="#" className="hover:underline">Economic Census</a>
          <a href="#" className="hover:underline">Enterprises Surveys</a>
          <a href="#" className="hover:underline">Periodic Labour Force Survey</a>
          <a href="#" className="hover:underline">Employment and Unemployment</a>
          <a href="#" className="hover:underline">Land and Livestock Holding Surveys</a>
          <a href="#" className="hover:underline">Other Surveys</a>
        </div>
      </section>
    </div>
  );
}
