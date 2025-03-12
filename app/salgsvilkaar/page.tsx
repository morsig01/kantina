import React from "react";

const Salgsvilkar = () => {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold">Salgsvilkår</h1>

      <section>
        <h2 className="text-2xl font-semibold">1. Firmaopplysninger</h2>
        <p>
          <strong>Firmanavn:</strong> Vikingfitness
          <br />
          <strong>Organisasjonsnummer:</strong> [Ditt org.nr]
          <br />
          <strong>Kontaktinformasjon:</strong> kontakt@vikingfitness.no
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">2. Priser og betaling</h2>
        <p>
          Alle priser oppgis i norske kroner (NOK) og inkluderer merverdiavgift
          (MVA) der dette er aktuelt. Vi aksepterer betaling via Vipps og andre
          betalingsmetoder oppgitt ved utsjekk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">3. Levering</h2>
        <p>
          Leveringstid for fysiske varer er normalt 2-5 virkedager. Digitale
          produkter leveres umiddelbart via e-post etter bekreftet betaling.
          Eventuelle fraktkostnader oppgis ved utsjekk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">4. Angrerett og retur</h2>
        <p>
          Du har 14 dagers angrerett i henhold til angrerettloven. For å benytte
          angreretten, kontakt oss på kontakt@vikingfitness.no innen 14 dager.
          Digitale produkter som leveres umiddelbart er unntatt angrerett.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">5. Personvern</h2>
        <p>
          Vi behandler personopplysninger i samsvar med GDPR. Informasjon du
          oppgir ved kjøp brukes kun til å gjennomføre bestillingen. Se vår
          personvernerklæring for mer informasjon.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">6. Tvisteløsning</h2>
        <p>
          Ved uenigheter forsøker vi å løse saken i minnelighet. Hvis dette ikke
          lykkes, kan saken bringes inn for Forbrukertilsynet eller relevant
          tvisteløsningsorgan.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        Disse vilkårene gjelder fra [dato] og kan oppdateres uten forvarsel.
      </p>
    </main>
  );
};

export default Salgsvilkar;
