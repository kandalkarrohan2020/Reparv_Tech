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
        `${URI}/territory-partner/agreement/accept/${
          user?.id || agreementData?.id
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
        <div className="agreement-content px-4 py-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            SERVICE AGREEMENT (TERRITORY PARTNER)
          </h2>

          <p>
            This agreement of partnership is entered into and executed on this{" "}
            {currentDate},
          </p>

          <p className="mt-4">
            <strong>BETWEEN</strong>
            <br />
            <span className="block mt-2">
              <strong>Reparv Services Pvt. Ltd.</strong> a company incorporated
              under the Companies Act, 2013, (hereinafter referred to as the{" "}
              <strong>“company”</strong>, which expression shall, unless it be
              repugnant to the context and meaning thereof, mean and include its
              successors, assigns, and representatives),
            </span>
          </p>

          <p className="mt-4">
            <p>
              <strong>AND</strong>
              <br />
              <strong>{agreementData.fullname || "__________"}</strong>, (PAN{" "}
              <strong>{agreementData.panno || "__________"}</strong>), a
              resident of <strong>{agreementData.city || "________"}</strong>,
              <strong> {agreementData.state || "_________"}</strong>,
              (hereinafter referred to as the{" "}
              <strong>“Territory Partner”</strong>, which expression shall,
              unless it be repugnant to the context and meaning thereof, mean
              and include his/her successors, assigns, and representatives).
            </p>
          </p>

          <p className="mt-4">
            The Company and the Territory Partner shall collectively be referred
            to as the <strong>“Parties”</strong> and individually as a{" "}
            <strong>“Party”</strong>.
          </p>

          <p className="mt-4">
            <strong>NOW WHEREAS,</strong> the Company is engaged in the business
            of providing comprehensive real estate solutions through digital and
            offline platforms.
          </p>

          <p className="mt-2">
            <strong>AND WHEREAS,</strong> the Company desires to engage the
            services of the Territory Partner to represent the Company and
            contribute to its business development and client servicing, on an
            incentive basis.
          </p>

          <p className="mt-2">
            <strong>AND WHEREAS,</strong> the Territory Partner is willing to
            accept such engagement with the Company on the terms and conditions
            set forth herein.
          </p>

          <p className="mt-2">
            <strong>AND WHEREAS,</strong> the Parties intend to record the terms
            of their arrangement in writing.
          </p>

          <p className="mt-4">
            <strong>NOW THEREFORE,</strong> the Parties to this Covenant
            mutually agree on the following terms and conditions as stated
            hereunder:
          </p>

          <h3 className="text-lg font-semibold mt-6">
            1. Definitions and Interpretation
          </h3>
          <p className="mt-2">
            In this Agreement where the context admits the following expressions
            shall have the following meanings, unless specifically mentioned
            otherwise:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Categories:</strong> means the categories for the purpose
              of distinction of properties on the basis the distinctiveness in
              nature of such properties and includes ‘New Flat’ ‘New Plot’ , ,
              ‘Rental’, ‘Resale’, ‘Row House’ ‘Lease’ ‘Farm House’ ‘Farm'Land’
              ‘Commercial Plot’ ‘Rental Office’ , ‘Industrial Space’ , ‘Rental
              Shop’ and any other category that may be added to this list by the
              Company, from time to time, as per the standard market
              requirements (As and where needed for referring to a single
              Category, the word “Category” is used in this Agreement);
            </li>
            <li>
              <strong>Client:</strong> means any customer of Company with whom
              you had material contact or business dealings or for whom you had
              responsibility in the twelve (12) months immediately preceding the
              date of termination of this Agreement;
            </li>
            <li>
              <strong>Conduct Rules:</strong> means the conduct rules in the
              clause 7 of this Agreement and Conduct Rules issued from time to
              time by the Company that apply or may apply to you by virtue of
              your engagement under this Agreement;
            </li>
            <li>
              <strong>Confidential Information:</strong> means trade secrets or
              information of a confidential nature which belongs or relates to
              the Company or their clients or customers or past or potential
              clients or customers, and which the Territory Partner may have
              received or obtained or become aware of as a result of or in any
              way in connection with the engagement with Company, including but
              not limited to information relating to all or any of their staff
              suppliers, agents or distributors, commercial, financial or
              marketing information, customer lists, technical and operational
              information, methods and processes and know-how comprising trade
              secrets;
            </li>
            <li>
              <strong>Intellectual Property:</strong> means designs, trademarks,
              logos, get-up, domain names, copyright works, database rights,
              confidential information, know-how, patents, inventions, utility
              models, semi-conductor topography rights and all rights of a
              similar nature in any part of the world whether or not registered
              or capable of registration and, in respect of such rights which
              are registrable, the right to apply for registration and all
              applications for any of the above rights
            </li>
            <li>
              <strong>Onboarding Partner:</strong> means any or all the
              Onboarding Partners of the Company;
            </li>
            <li>
              <strong>Project Partner:</strong> A means any or all the Project
              Partners of the Company;
            </li>
            <li>
              <strong>Properties:</strong> means all the properties, whether
              separate units/apartments or the whole projects sites, which are
              registered/listed with the Company by its Onboarding Partners or
              Project Partners, for availing the services of the Company. (As
              and where needed for referring to a single unit/apartment, the
              word “Property” is used in this Agreement.);
            </li>
            <li>
              <strong>Prospective Client:</strong> means any person with whom
              the Company shall have had negotiations or material discussions
              regarding the possible supply of services or distribution, sale or
              supply of any product, goods or services at any time during the
              twelve (12) months immediately preceding the date of termination
              of this Agreement and with whom you shall have had business
              dealings at any time during such period;
            </li>
            <li>
              <strong>Sales Partner:</strong> means any or all the Sales
              Partners of the Company;
            </li>
            <li>
              <strong>Successful Deal:</strong> means (i) the sale of any
              Property of any of the Onboarding Partners or any of the Project
              Partners of the Company, to a Prospective Client or a Client, or
              (ii) the letting of any Property of any of the Onboarding Partners
              of the Company to a Prospective Client or a Client and only when
              the Territory Partner was assigned by the Company to assist such
              Prospective Client or a Client, for providing the services offered
              by the Company.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6">
            2. Purpose and Scope of Engagement
          </h3>
          <p className="mt-2">
            The Territory Partner shall provide his services to the Company to
            act as a non- exclusive agent to provide real estate-related
            services for the Company as may be mutually agreed from time to
            time, which may not be restricted to but primarily include visiting
            properties, arranging site visits to the Properties for the
            Prospective Clients or Clients and accompanying them, as per the
            recommendations of the concerned Sales Partner and in accordance
            with the trends and practices acquired by the Company. The services
            of Territory Partner are engaged only for the (mention selected
            category) Category as agreed by both the Parties. The scope of
            engagement may also include coordinating with the Onboarding
            Partners or the Project Partner or their respective agents or
            employees authorized for such purpose (as the case may be) for the
            documentation purposes in case of a successful deal. The scope of
            all the work of Territory Partner, under this Agreement, shall be
            restricted to the boundaries or area as may be decided mutually by
            the Company and the Territory Partner from time to time.
          </p>

          <h3 className="text-lg font-semibold mt-6">
            3. Nature of Relationship
          </h3>
          <p className="mt-2">
            This Agreement does not constitute a partnership under the Indian
            Partnership Act, 1932. The term “Partner” is used purely for
            representational purposes and does not confer any ownership or
            management rights in the Company. The expression “Partner” shall at
            no point of time be interpreted to mean an actual partner under any
            law that may be in force for the time being. The Territory Partner
            shall not be deemed an employee of the Company and shall have no
            authority to bind the Company contractually. Nothing contained in
            this Agreement shall be deemed to create any relationship of
            partnership, joint venture, agency, employer-employee, franchisor-
            franchisee, or otherwise between the Parties, and the Territory
            Partner shall not be entitled to any employment benefits, insurance,
            or other statutory entitlements. This Agreement has been entered
            into for engaging the services of the Territory Partner.
          </p>

          <h3 className="text-lg font-semibold mt-6">4. Compensation</h3>
          <p className="mt-2">
            The Territory Partner shall be compensated by way of an Incentive on
            every Successful Deal (in which the Territory Partner has acted in
            the scope and capacity of this Agreement). The amount or the rate of
            such incentive payable to the Territory Partner shall be specified
            under all the Properties listed on the Company’s website. Taxes, if
            applicable, shall be deducted at source as per prevailing laws. (The
            payment of such incentive shall be initiated, in cases of Sale of
            Properties, within 15 days after the loan disbursement to the
            Client, and in cases of letting out of the Properties, within 15
            days after the documentation of such Successful Deal has been
            completed.)
          </p>

          <h3 className="text-lg font-semibold mt-6">5. Confidentiality</h3>
          <p className="mt-2">
            The Territory Partner agrees to maintain the confidentiality of not
            only the Confidential Information within the scope of this
            Agreement, but also all data, information, and materials collected,
            accessed, or processed through the Company’s website or otherwise
            during the term of this Agreement. The Territory Partner shall not,
            without prior written consent of the Company, use or disclose such
            information for any purpose other than as required for performance
            under this Agreement. This clause shall survive termination of this
            Agreement.
          </p>

          <h3 className="text-lg font-semibold mt-6">6. Non-Compete</h3>
          <p className="mt-2">
            The Territory Partner agrees that during the term of this Agreement
            and for a period of twelve (12) months following the termination
            hereof, the Territory Partner shall not, directly or indirectly,
            engage in or be associated with any business that is similar to or
            competitive with the business of the Company, within India or any
            other territory where the Company operates.
          </p>

          <h3 className="text-lg font-semibold mt-6">7. Conduct Rules</h3>
          <ul className="list-decimal pl-6 mt-2 space-y-2">
            <li>
              The Territory Partner shall accompany the Prospective Clients and
              Clients assigned to him by the Company, through the Sales Partner,
              to the properties as recommended by the Sales Partner, for
              providing them the services offered by the Company, including but
              not limited to supplying required and relevant information about
              the properties so visited/accompanied along with the Prospective
              Clients or Clients, coordinating with the concerned Onboarding
              Partner or the Project Partner or their respective agents or
              employees authorized for such purpose (as the case may be) in
              accordance with the policies of the Company that may be directed
              to the Territory Partner from time to time. The Territory Partner
              shall also be required to act as an intermediary (on behalf of the
              Company) between any Prospective Client or a Client and the
              Onboarding Partner or the Project Partner or their respective
              agents or employees authorized for such purpose (as the case may
              be).
            </li>
            <li>
              The Territory Partner shall endeavor to convert maximum enquiries
              and the site visits of Prospective Clients or Clients into
              Successful Deals, with complete honesty and integrity, while also
              upholding the clauses of confidentiality within the scope and
              meaning of this Agreement.
            </li>
            <li>
              The Territory Partner shall not, at any point of time during the
              period of this Agreement and Twelve (12) months after its
              termination, interact, advise, recommend any Properties to the
              Prospective Clients or Clients or accompany them to such
              Properties, in individual capacity, by bypassing the Company. If
              the Territory Partner desires to recommend, showcase for the
              purpose of sale or letting out of any of the Properties, to a
              person other than a Prospective Client or Client, he/she must take
              him through the channel of Company and such person shall then
              deemed to be a Prospective Client and the Territory Partner shall
              naturally be assigned to assist such Prospective Client introduced
              by him/her, in cases where such person is interested in a Property
              within the category of the Territory Partner; and in cases where
              such person is interested in a Property from any of the Categories
              other than that of the Territory Partner, the Territory Partner
              shall act and be treated as a Sales Partner of the Company and not
              as a Territory Partner.
            </li>
            <li>
              The Territory Partner shall not, at any point of time during the
              period of this Agreement and Twelve (12) months after its
              termination, try to act as an agent for any of the Onboarding
              Partners or/and Project Partners, to directly take Prospective
              Clients, Clients or even prospective buyers or tenants who have
              not engaged with the Company, to such Onboarding Partners or/and
              Project Partners for showcasing their Properties, by bypassing the
              Company. The Territory Partner must, at all times go only through
              the channel of the Company for connecting or engaging with the
              Onboarding Partners or/and Project Partners of the Company.
            </li>
            <li>
              The Territory Partner shall neither make any false promises to any
              person associated with the Company nor shall he/she indulge in any
              kind of malpractice with any person associated in any way with the
              Company. In case anything contrary to this sub-clause is brought
              to the notice of the Company, the Territory Partner shall be
              liable to pay to the Company all the damages that such false
              promise or malpractice would cause.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6">8. Termination</h3>
          <p className="mt-2">
            Notwithstanding anything contained in the Clause 15, the Company may
            terminate this Agreement immediately, without any liability or
            obligation, in the event of: Breach of any term or condition of this
            Agreement by the Territory Partner; (b) Misconduct, fraud, or
            willful negligence by the Territory Partner; Any act by the
            Territory Partner that brings disrepute to the Company or its (c)
            business. (d) Breach of Conduct Rules (c) or (d); and in such a
            case, the Territory Partner shall be liable to pay to the Company
            all the amount that he/she has received or would have received in
            the event of such dealing being successful. The Territory Partner
            may terminate this Agreement with a prior written notice of 30
            (thirty) days.
          </p>

          <h3 className="text-lg font-semibold mt-6">9. Idemnity</h3>
          <p className="mt-2">
            The Territory Partner agrees to indemnify, defend, and hold harmless
            the Company, its officers, directors, partners and employees from
            and against any claims, liabilities, losses, damages, and expenses
            arising out of or in connection with any breach of this Agreement or
            any unlawful act committed by the Territory Partner.
          </p>

          <h3 className="text-lg font-semibold mt-6">
            10. Governing Law and Dispute Resolution
          </h3>
          <p className="mt-2">
            This Agreement shall be governed by and construed in accordance with
            the laws of India. The Parties agree that in case of any dispute
            arising out of or in connection with this Agreement, the Parties
            shall first endeavour to resolve the dispute amicably by mutual
            co-operation. The Parties further agree that the courts in Nagpur
            shall have the exclusive territorial jurisdiction over any or all
            such disputes arising out of this Agreement.
          </p>

          <h3 className="text-lg font-semibold mt-6">11. Force Majeure</h3>
          <p className="mt-2">
            Neither Party shall be held liable for failure or delay in
            performance of its obligations due to events beyond its reasonable
            control, including but not limited to acts of God, war, riots,
            governmental restrictions, natural disasters, pandemics, or power
            failures.
          </p>

          <h3 className="text-lg font-semibold mt-6">12. Amendment</h3>
          <p className="mt-2">
            No amendment or modification of this Agreement shall be valid unless
            made in writing and signed by both Parties.
          </p>

          <h3 className="text-lg font-semibold mt-6">13. Severability</h3>
          <p className="mt-2">
            If any provision of this Agreement is found to be invalid or
            unenforceable, the remainder of the Agreement shall remain in full
            force and effect.
          </p>

          <h3 className="text-lg font-semibold mt-6">14. Notices</h3>
          <p className="mt-2">
            All notices or communications under this Agreement shall be made
            through electronic mails, on the e-mail address(es) of the Parties
            as mentioned hereunder, or to such other address(es) as may be
            notified in writing: e-mail address of the Company -
            management@reparv.in e-mail address of the Territory Partner -{" "}
            {agreementData?.email}
          </p>

          <h3 className="text-lg font-semibold mt-6">15. Duration</h3>
          <p className="mt-2">
            The Duration of this Agreement shall be twelve (12) months from the
            date of entering into this Agreement. The Agreement shall
            automatically cease to exist and enforceable after the lapse of 12
            months. The Parties may however, renew the Agreement on the same
            terms and conditions or with such amendments as mutually agreed.
          </p>

          <p className="font-semibold">IN WITNESS WHEREOF</p>
          <p>
            The Parties hereto have executed this Agreement on this day{" "}
            {currentDate}.
            <br />
            <br />
            _________________ (For Reparv Services Pvt. Ltd.)
            <br />
            _________________ (For Territory Partner)
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
