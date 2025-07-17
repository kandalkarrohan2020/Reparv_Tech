import { useState, useEffect } from "react";
import Loader from "./Loader";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../store/auth";
import { format } from "date-fns";

const Agreement = ({ fetchAgreement, agreementData, setAgreementData }) => {
  const { user, URI, setLoading } = useAuth();
  const currentDate = format(new Date(), "do MMMM yyyy");
  const [agreementStatus, setAgreementStatus] = useState(0);

  const acceptAgreement = async (e) => {
    e.preventDefault();
    setLoading(true);

    let agreement;
    if (agreementStatus == 1) {
      agreement = "Accept";
    } else {
      agreement = "Reject";
    }

    try {
      const response = await fetch(
        `${URI}/partner/agreement/accept/${
          user?.id || agreementData?.partnerid
        }`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ agreement }),
        }
      );

      if (response.status === 409) {
        alert("Agreement has already been accepted.");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }

      alert("Agreement accepted successfully!");
      fetchAgreement(user?.id);
    } catch (err) {
      console.error("Error accepting agreement:", err);
      alert(`An error occurred while accepting the agreement: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        agreementData.agreement === "Reject" && agreementData.adharno
          ? "flex bg-[#767676a0]"
          : "hidden"
      } z-[61] overflow-scroll scrollbar-hide w-full h-screen fixed items-end md:items-center md:justify-center bottom-0 md:bottom-auto `}
    >
      <div className="w-full overflow-scroll scrollbar-hide md:w-[700px] lg:w-[900px] h-[90vh] md:max-h-[80vh] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-tl-xl rounded-tr-xl md:rounded-lg">
        {/* Header */}

        {/* Agreement Content */}

        <div className="p-6 text-justify space-y-4 text-[15px] leading-[1.8]">
          <h2 className="text-xl font-semibold text-center underline">
            LISTING AGREEMENT (ONBOARDING)
          </h2>

          <p>
            This agreement of partnership is entered into and executed on this
            day {currentDate},
          </p>

          <p>
            <strong>BETWEEN</strong>
          </p>

          <p>
            <strong>Reparv Services Pvt. Ltd.</strong> a company incorporated
            under the Companies Act, 2013, (hereinafter referred to as the
            “company”, which expression shall, unless it be repugnant to the
            context and meaning thereof shall mean and include its successors,
            assigns, and representatives),
          </p>

          <p>
            <strong>AND</strong>
          </p>

          <p>
            <strong>{agreementData.fullname || "__________"}</strong>, (PAN{" "}
            <strong>{agreementData.panno || "__________"}</strong>), a resident
            of <strong>{agreementData.city || "________"}</strong>,
            <strong> {agreementData.state || "_________"}</strong>, (hereinafter
            referred to as the <strong>“Onboarding Partner”</strong>, which
            expression shall, unless it be repugnant to the context and meaning
            thereof shall mean and include its/his/her successors, assigns, and
            representatives).
          </p>

          <p>
            The Company and the Onboarding Partner shall collectively be
            referred to as the “Parties” and individually as a “Party”.
          </p>

          <p>
            <strong>NOW WHEREAS,</strong> the Company is engaged in the business
            of providing comprehensive real estate solutions through digital and
            offline platforms.
          </p>

          <p>
            <strong>AND WHEREAS,</strong> the Onboarding Partner is desirous of
            registering properties, that are either owned by the Onboarding
            Partner or the Onboarding Partner is authorised to promote such
            properties, with the Company and listing those on the website of the
            Company for the purpose of showcasing and facilitating sales/letting
            out of the said Properties to the Clients or Prospective Clients.
          </p>

          <p>
            <strong>AND WHEREAS,</strong> the Company is willing to accept such
            engagement with the Onboarding Partner on the terms and conditions
            set forth herein.
          </p>

          <p>
            <strong>AND WHEREAS,</strong> the Parties intend to record the terms
            of their arrangement in writing.
          </p>

          <p>
            <strong>NOW THEREFORE,</strong> the Parties to this Covenant
            mutually agree on the following terms and conditions as stated
            hereunder:
          </p>

          <h3 className="text-lg font-semibold underline">
            1. Definitions and Interpretation
          </h3>

          <p>
            In this Agreement, where the context admits, the following
            expressions shall have the following meanings, unless specifically
            mentioned otherwise:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>(a) “Client”</strong> means any customer of the Company
              with whom the Onboarding Partner had material contact or business
              dealings in the twelve (12) months immediately preceding the date
              of termination of this Agreement;
            </li>
            <li>
              <strong>(b) “Conduct Rules”</strong> means the conduct rules in
              the clause 9 of this Agreement and Conduct Rules issued from time
              to time by the Company that apply or may apply to the Onboarding
              Partner by virtue of its engagement under this Agreement;
            </li>
            <li>
              <strong>(c) “Confidential Information”</strong> means trade
              secrets or information of a confidential nature which belongs or
              relates to the Company or their clients or customers or past or
              potential clients or customers, and which the Onboarding Partner
              may have received or obtained or become aware of as a result of or
              in any way in connection with the engagement with Company,
              including but not limited to information relating to all or any of
              their staff, suppliers, agents or distributors, commercial,
              financial or marketing information, customer lists, technical and
              operational information, methods and processes, and know-how
              comprising trade secrets;
            </li>
            <li>
              <strong>(d) “Properties”</strong> means all the properties,
              whether separate units/apartments or the whole project sites,
              which are registered/listed with the Company by the Onboarding
              Partner, for availing the services of the Company. Such properties
              may be either owned by the Onboarding Partner or the Onboarding
              Partner may be authorised to promote such properties by the actual
              owner of such Property. (As and where needed for referring to a
              single unit/apartment, the word “Property” is used in this
              Agreement);
            </li>
            <li>
              <strong>(e) “Prospective Client”</strong> means any person with
              whom the Company shall have had negotiations or material
              discussions regarding the possible supply of services or
              distribution, sale or supply of any product, goods or services at
              any time during the twelve (12) months immediately preceding the
              date of termination of this Agreement and with whom the Onboarding
              Partner shall have had business dealings at any time during such
              period;
            </li>
            <li>
              <strong>(f) “Sales Partner”</strong> means any or all the Sales
              Partners of the Company;
            </li>
            <li>
              <strong>(g) “Successful Deal”</strong> means (i) the sale of
              either of the Properties listed by the Onboarding Partner, or (ii)
              the letting out of either of the Properties listed by the
              Onboarding Partner, only when such Successful Deal has been
              facilitated by the Company through its agents or representatives
              including the Sales Partners and Territory Partners;
            </li>
            <li>
              <strong>(h) “Territory Partner”</strong> means any or all the
              Territory Partners of the Company.
            </li>
          </ul>

          <div>
            <h3 className="text-lg font-semibold underline">
              2. Purpose and Scope of Engagement
            </h3>
            <p>
              The Onboarding Partner hereby engages the services of the Company
              as an intermediary for the listing, display, and marketing, of
              Properties owned by the Onboarding Partner, on the Company's
              website and associated platforms for the benefit of Clients and
              Prospective Clients. This Agreement, for the aforesaid purpose,
              acts as a parent agreement governing all the listings that may be
              done from time to time, with mutual understanding of the Parties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              3. Nature of Relationship
            </h3>
            <p>
              This Agreement does not constitute a partnership under the Indian
              Partnership Act, 1932. The term “Partner” is used purely for
              representational purposes and does not confer any ownership or
              management rights in the Company. The expression “Partner” shall
              at no point of time be interpreted to mean an actual partner under
              any law that may be in force for the time being. Nothing contained
              in this Agreement shall be deemed to create any relationship of
              partnership, joint venture, agency, employer- employee,
              franchisor-franchisee, or otherwise between the Parties, except as
              expressly provided herein.
            </p>
            <p>
              The Company acts merely as an intermediary to facilitate marketing
              and introduction between the Onboarding Partner and Prospective
              Clients.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              4. Charges/Distribution of Brokerage
            </h3>
            <p>
              The Parties agree that upon a Successful Deal, the total amount of
              brokerage that would be gained from the actual owner of the
              Property (for such Successful Deal) sold or let out in such
              Successful Deal, shall be distributed equally amongst the Parties,
              i.e. in the ratio of 1:1 (50% to the Company and 50% to the
              Onboarding Partner). The Onboarding Partner shall not be entitled
              to any other compensation other than the abovementioned
              distribution of the amount of brokerage obtained from the actual
              owner. In such a case where in a Successful Deal, the Property
              owned by the Onboarding Partner has been sold or let out, the
              Onboarding Partner shall pay to the Company 50% of the amount of
              brokerage that would have otherwise been charged.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              5. Accuracy of Information and Liability
            </h3>
            <p>
              The Onboarding Partner represents and warrants that all
              information, brochures, floor plans, specifications, approvals,
              title documents, and any other details provided to the Company for
              listing and marketing purposes shall be true, correct, and
              complete in all respects.
            </p>
            <p>
              In the event any information provided is found to be false,
              misleading, or inaccurate or in the event the title document is
              found out to be bogus or fraudulent, the Onboarding Partner shall
              bear sole responsibility and liability for all consequences,
              claims, losses, or damages arising therefrom.
            </p>
            <p>
              The Company shall not be liable in any manner for any disputes,
              claims, or litigations arising from such incorrect information or
              fraudulent document, and shall be deemed a mere intermediary
              facilitating information sharing.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              6. Permission to Access Properties
            </h3>
            <p>
              The Onboarding Partner grants permission to the authorized agents,
              representatives, and employees of the Company to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                (a) Visit the listed Properties or any other projects for
                inspection and data verification; and
              </li>
              <li>
                (b) Accompany Prospective Clients or Clients to the Properties
                for the purpose of showcasing, marketing, and sale facilitation.
              </li>
            </ul>
            <p>
              The Onboarding Partner shall provide reasonable assistance to
              facilitate such visits.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              7. Confidentiality
            </h3>
            <p>
              The Onboarding Partner agrees to maintain the confidentiality of
              not only the Confidential Information within the scope of this
              Agreement, but also all the data, information, and materials
              collected, accessed, or processed through the Company’s website or
              otherwise during the term of this Agreement. The Onboarding
              Partner shall not, without prior written consent of the Company,
              use or disclose such information for any purpose other than as
              required for performance under this Agreement. This clause shall
              survive termination of this Agreement.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">8. Non-Compete</h3>
            <p>
              The Onboarding Partner agrees that during the term of this
              Agreement and for a period of twelve (12) months following the
              termination hereof, the Onboarding Partner shall not, directly or
              indirectly, engage in or be associated with any business that is
              similar to or competitive with the business of the Company, within
              India or any other territory where the Company operates.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              9. Conduct Rules
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                (a) The Onboarding Partner shall grant permission to the
                Territory Partners and Sales Partners of the Company or any
                other authorized agents, representatives, and employees of the
                Company to visit the listed Properties for inspection and data
                verification and also accompany Clients or Prospective Clients
                to the Properties for the purpose of showcasing, marketing, and
                sale facilitation. The Onboarding Partner shall provide
                reasonable assistance to facilitate such visits.
              </li>
              <li>
                (b) The Onboarding Partner shall deal with the Clients or
                Prospective Clients, with complete honesty and integrity, while
                also upholding the clauses of confidentiality within the scope
                and meaning of this Agreement.
              </li>
              <li>
                (c) The Onboarding Partner agrees that it shall not, at any
                point of time during the period of this Agreement and Twelve
                (12) months after its termination, directly engage with,
                solicit, or finalize any transaction with any Client or
                Prospective Client of the Company, without the prior written
                consent of the Company, by bypassing the Company. Any engagement
                or transaction in violation of this clause shall entitle the
                Company to seek appropriate legal remedies including
                compensation.
              </li>
              <li>
                (d) The Onboarding Partner shall not, at any point of time
                during the period of this Agreement and Twelve (12) months after
                its termination, try to directly engage the Territory Partners
                or Sales Partners or any other agents or employees of the
                Company for showcasing their Properties and further dealings, by
                bypassing the Company.
              </li>
              <li>
                (e) The Onboarding Partner shall neither make any false promises
                to any person associated with the Company nor shall he/she
                indulge in any kind of malpractice with any person associated in
                any way with the Company. In case anything contrary to this
                sub-clause is brought to the notice of the Company, the
                Onboarding Partner shall be liable to pay to the Company all the
                damages that such false promise or malpractice would cause.
              </li>
              <li>
                (f) The Onboarding Partner shall, at all the times, duly follow
                the relevant laws that may be made applicable from time to time
                by the appropriate government.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">10. Termination</h3>
            <p>
              Notwithstanding anything contained in the Clause 17, this
              Agreement may be terminated:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                (a) By either Party, by giving 30 (thirty) days' prior written
                notice to the other Party; or
              </li>
              <li>
                (b) Immediately by the Company in the event of breach by the
                Onboarding Partner of any of the Conduct Rules, or breach of
                Clause 5 or breach of any representation, warranty, term, or any
                other obligation under this Agreement; or
              </li>
              <li>(c) Upon express mutual agreement of the Parties.</li>
            </ul>
            <p>
              Upon termination, the Company shall remove the Onboarding
              Partner's listings from its platform within a reasonable period.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">11. Indemnity</h3>
            <p>
              The Onboarding Partner agrees to indemnify, defend, and hold
              harmless the Company, its officers, directors, partners and
              employees from and against any claims, liabilities, losses,
              damages, and expenses arising out of or in connection with any
              breach of this Agreement or any unlawful act committed by the
              Onboarding Partner.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              12. Governing Law and Dispute Resolution
            </h3>
            <p>
              This Agreement shall be governed by and construed in accordance
              with the laws of India. The Parties agree that in case of any
              dispute arising out of or in connection with this Agreement, the
              Parties shall first endeavour to resolve the dispute amicably by
              mutual co-operation. The Parties further agree that the courts in
              Nagpur shall have the exclusive territorial jurisdiction over any
              or all such disputes arising out of this Agreement.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              13. Force Majeure
            </h3>
            <p>
              Neither Party shall be held liable for failure or delay in
              performance of its obligations due to events beyond its reasonable
              control, including but not limited to acts of God, war, riots,
              governmental restrictions, natural disasters, pandemics, or power
              failures.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">14. Amendment</h3>
            <p>
              No amendment or modification of this Agreement shall be valid
              unless made in writing and signed by both Parties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">
              15. Severability
            </h3>
            <p>
              If any provision of this Agreement is found to be invalid or
              unenforceable, the remainder of the Agreement shall remain in full
              force and effect.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">16. Notices</h3>
            <p>
              All notices or communications under this Agreement shall be made
              through electronic mails, on the e-mail address(es) of the Parties
              as mentioned hereunder, or to such other address(es) as may be
              notified in writing:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>e-mail address of the Company - management@reparv.in</li>
              <li>
                e-mail address of the Project Partner - {agreementData?.email}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold underline">17. Duration</h3>
            <p>
              The Duration of this Agreement shall be twelve (12) months from
              the date of entering into this Agreement. The Agreement shall
              automatically cease to exist and be enforceable after the lapse of
              12 months. The Parties may however, renew the Agreement on the
              same terms and conditions or with such amendments as mutually
              agreed.
            </p>
          </div>

          <p className="font-semibold">IN WITNESS WHEREOF</p>
          <p>
            The Parties hereto have executed this Agreement on this day{" "}
            {currentDate}.
            <br />
            <br />
            _________________ (For Reparv Services Pvt. Ltd.)
            <br />
            _________________ (For Onboarding Partner)
          </p>
        </div>

        <form onSubmit={acceptAgreement}>
          {/* Accept Checkbox */}
          <div className="w-full flex items-start gap-2 mt-4">
            <input
              type="checkbox"
              id="agreement"
              required
              checked={agreementStatus}
              onChange={(e) => setAgreementStatus(e.target.checked)}
              className="mt-1 accent-green-600"
            />
            <label htmlFor="agreement" className="text-sm">
              I hereby agree to all the terms, conditions and clauses mentioned
              hereinabove and enter into this listing agreement at my own will.
            </label>
          </div>

          {/* Actions */}
          <div className="flex mt-8 md:mt-6 justify-end gap-6">
            <button
              type="Submit"
              className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
            >
              Accept Agreement
            </button>
            <div>
              <Loader />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Agreement;
