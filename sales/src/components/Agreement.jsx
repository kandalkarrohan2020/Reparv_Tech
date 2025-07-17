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
        `${URI}/sales/agreement/accept/${
          user?.id || agreementData?.salespersonsid
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
        <div className="text-sm text-gray-800 space-y-4">
          <p className="text-center text-lg font-bold uppercase md:underline">
            Service Agreement (Sales Partner)
          </p>

          <p>
            This agreement of partnership is entered into and executed on this{" "}
            <strong>{ currentDate } || "__"</strong>,
          </p>

          <p>
            <strong>BETWEEN</strong>
            <br />
            Reparv Services Pvt. Ltd. a company incorporated under the Companies
            Act, 2013 (hereinafter referred to as the “Company”, which
            expression shall, unless repugnant to the context and meaning
            thereof, include its successors, assigns, and representatives),
          </p>

          <p>
            <strong>AND</strong>
            <br />
            <strong>{agreementData.fullname || "__________"}</strong>, (PAN{" "}
            <strong>{agreementData.panno || "__________"}</strong>), a resident
            of <strong>{agreementData.city || "________"}</strong>,
            <strong> {agreementData.state || "_________"}</strong>, (hereinafter
            referred to as the “Sales Partner”, which expression shall, unless
            repugnant to the context and meaning thereof, include his/her
            successors, assigns, and representatives).
          </p>

          <p>
            The Company and the Sales Partner shall collectively be referred to
            as the “Parties” and individually as a “Party”.
          </p>

          <p>
            NOW WHEREAS, the Company is engaged in the business of providing
            comprehensive real estate solutions through digital platforms.
          </p>

          <p>
            AND WHEREAS, the Company desires to engage the services of the Sales
            Partner to represent the Company and contribute to its business
            development and client servicing, on an incentive basis.
          </p>

          <p>
            AND WHEREAS, the Sales Partner is willing to accept such engagement
            with the Company on the terms and conditions set forth herein.
          </p>

          <p>
            AND WHEREAS, the Parties intend to record the terms of their
            arrangement in writing.
          </p>

          <p>
            NOW THEREFORE, the Parties to this Covenant mutually agree on the
            following terms and conditions:
          </p>

          <h2 className="font-bold">1. Definitions and Interpretation</h2>

          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              In this Agreement where the context admits, the following
              expressions shall have the following meanings, unless specifically
              mentioned otherwise:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>“Client”</strong> – means any customer of Company with
                whom you had material contact or business dealings or for whom
                you had responsibility in the twelve (12) months immediately
                preceding the date of termination of this Agreement;
              </li>
              <li>
                <strong>“Conduct Rules”</strong> – means the conduct rules in
                the clause 7 of this Agreement and Conduct Rules issued from
                time to time by the Company that apply or may apply to you by
                virtue of your engagement under this Agreement;
              </li>
              <li>
                <strong>“Confidential Information”</strong> – means trade
                secrets or information of a confidential nature which belongs or
                relates to the Company or their clients or customers or past or
                potential clients or customers, and which the Sales Partner may
                have received or obtained or become aware of as a result of or
                in any way in connection with the engagement with Company,
                including but not limited to information relating to all or any
                of their staff suppliers, agents or distributors, commercial,
                financial or marketing information, customer lists, technical
                and operational information, methods and processes and know-how
                comprising trade secrets;
              </li>
              <li>
                <strong>“Intellectual Property”</strong> – means designs,
                trademarks, logos, get-up, domain names, copyright works,
                database rights, confidential information, know-how, patents,
                inventions, utility models, semi-conductor topography rights and
                all rights of a similar nature in any part of the world whether
                or not registered or capable of registration and, in respect of
                such rights which are registrable, the right to apply for
                registration and all applications for any of the above rights;
              </li>
              <li>
                <strong>“Onboarding Partner”</strong> – means any or all the
                Onboarding Partners of the Company;
              </li>
              <li>
                <strong>“Project Partner”</strong> – means any or all the
                Project Partners of the Company.
              </li>
              <li>
                <strong>“Properties”</strong> – means all the properties,
                whether separate units/apartments or the whole projects sites,
                which are registered/listed with the Company by its Onboarding
                Partners or Project Partners, for availing the services of the
                Company. (As and where needed for referring to a single
                unit/apartment, the word “Property” is used in this Agreement.)
              </li>
              <li>
                <strong>“Prospective Client”</strong> – means any person with
                whom the Company shall have had negotiations or material
                discussions regarding the possible supply of services or
                distribution, sale or supply of any product, goods or services
                at any time during the twelve (12) months immediately preceding
                the date of termination of this Agreement and with whom you
                shall have had business dealings at any time during such period;
              </li>
              <li>
                <strong>“Successful Deal”</strong> – means (i) the sale of any
                Property of any of the Onboarding Partners or any of the Project
                Partners of the Company, to a Prospective Client or a Client, or
                (ii) the letting of any Property of any of the Onboarding
                Partners of the Company to a Prospective Client or a Client and
                only when the Sales Partner was assigned by the Company to
                assist such Prospective Client or a Client, for providing the
                services offered by the Company;
              </li>
              <li>
                <strong>“Territory Partner”</strong> – means any or all the
                Territory Partners of the Company.
              </li>
            </ul>
          </div>

          <h3 className="font-bold">2. Purpose and Scope of Engagement</h3>
          <p>
            The Sales Partner shall provide his services to the Company to act
            as a non-exclusive agent to provide real estate-related services for
            the Company as may be mutually agreed from time to time, which may
            not be restricted to but primarily include analyzing the queries of
            the clients received on the website of the company and advising them
            as per their stated requirements, in accordance with the trends and
            practices acquired by the Company. The scope of engagement may also
            include site visits with the Prospective Client or a Client.
          </p>

          <h3 className="font-bold">3. Nature of Relationship</h3>
          <p>
            This Agreement does not constitute a partnership under the Indian
            Partnership Act, 1932. The term “Partner” is used purely for
            representational purposes and does not confer any ownership or
            management rights in the Company. The expression “Partner” shall at
            no point of time be interpreted to mean an actual partner under any
            law that may be in force for the time being. The Sales Partner shall
            not be deemed an employee of the Company and shall have no authority
            to bind the Company contractually. Nothing contained in this
            Agreement shall be deemed to create any relationship of partnership,
            joint venture, agency, employer-employee, franchisor-franchisee, or
            otherwise between the Parties, and the Sales Partner shall not be
            entitled to any employment benefits, insurance, or other such
            statutory entitlements. This Agreement has been entered into for
            engaging the services of the Sales Partner.
          </p>

          <h3 className="font-bold">4. Compensation</h3>
          <p>
            The Sales Partner shall be compensated by way of an Incentive on
            every Successful Deal (in which the Sales Partner has acted in the
            scope and capacity of this Agreement). The amount or the rate of
            such incentive payable to the Sales Partner shall be specified under
            all the Properties listed on the Company’s website. Taxes, if
            applicable, shall be deducted at source as per prevailing laws. (The
            payment of such incentive shall be initiated, in cases of Sale of
            Properties, within 15 days after the loan disbursement to the
            Client, and in cases of letting out of the Properties, within 15
            days after the documentation of such Successful Deal has been
            completed.)
          </p>

          <h3 className="font-bold">5. Confidentiality</h3>
          <p>
            The Sales Partner agrees to maintain the confidentiality of not only
            the Confidential Information within the scope of this Agreement, but
            also all data, information, and materials collected, accessed, or
            processed through the Company’s website or otherwise during the term
            of this Agreement. The Sales Partner shall not, without prior
            written consent of the Company, use or disclose such information for
            any purpose other than as required for performance under this
            Agreement. This clause shall survive termination of this Agreement.
          </p>

          <h3 className="font-bold">6. Non-Compete</h3>
          <p>
            The Sales Partner agrees that during the term of this Agreement and
            for a period of twelve (12) months following the termination hereof,
            the Sales Partner shall not, directly or indirectly, engage in or be
            associated with any business that is similar to or competitive with
            the business of the Company, within India or any other territory
            where the Company operates.
          </p>

          <h3 className="font-bold">7. Conduct Rules</h3>
          <ol type="a" className="pl-[1rem]">
            <li>
              The Sales Partner shall entertain all the queries of the
              Prospective Clients and Clients assigned to him by the Company for
              providing them the services offered by the Company, and upon such
              queries, the Sales Partner shall accordingly give suggestions or
              recommendations to such Prospective Clients or Clients, based on
              various factors as would be deemed essential for such purpose, in
              accordance with the policies of the Company that may be directed
              to the Sales Partner from time to time. The Sales Partner may also
              be required to coordinate with the Territory Partner of the
              Company and also at times to physically visit any of the
              Properties along with any Prospective Client or a Client.
            </li>
            <li>
              The Sales Partner shall endeavor to convert maximum queries into
              Successful Deals, with complete honesty and integrity, while also
              upholding the clauses of confidentiality within the scope and
              meaning of this Agreement.
            </li>
            <li>
              The Sales Partner shall not, at any point of time during the
              period of this Agreement and Twelve (12) months after its
              termination, interact, advise or recommend any Properties to the
              Prospective Clients or Clients in individual capacity, by
              bypassing the Company. If the Sales Partner desires to recommend
              any of the Properties, to a person other than a Prospective Client
              or Client, he/she must take him through the channel of Company and
              such person shall then deemed to be a Prospective Client and the
              Sales Partner shall naturally be assigned to assist such
              Prospective Client introduced by him/her.
            </li>
            <li>
              The Sales Partner shall not, at any point of time during the
              period of this Agreement and Twelve (12) months after its
              termination, try to act as an agent for any of the Onboarding
              Partners or/and Project Partners, to directly take Prospective
              Clients or even prospective buyers or tenants who have not engaged
              with the Company, to such Onboarding Partners or/and Project
              Partners for showcasing their Properties, by bypassing the
              Company. The Sales Partner must, at all times go only through the
              channel of the Company for connecting or engaging with the
              Onboarding Partners or/and Project Partners of the Company.
            </li>
            <li>
              The Sales Partner shall neither make any false promises to any
              person associated with the Company nor shall he/she indulge in any
              kind of malpractice with any person associated in any way with the
              Company. In case anything contrary to this sub-clause is brought
              to the notice of the Company, the Sales Partner shall be liable to
              pay to the Company all the damages that such false promise or
              malpractice would cause.
            </li>
          </ol>

          <h3 className="font-bold">8. Termination</h3>
          <ol type="a" className="pl-[1rem]">
            <li>
              Notwithstanding anything contained in Clause 15, the Company may
              terminate this Agreement immediately, without any liability or
              obligation, in the event of:
              <ul className="list-disc ml-6">
                <li>
                  Breach of any term or condition of this Agreement by the Sales
                  Partner;
                </li>
                <li>
                  Misconduct, fraud, or willful negligence by the Sales Partner;
                </li>
                <li>
                  Any act by the Sales Partner that brings disrepute to the
                  Company or its business;
                </li>
                <li>
                  Breach of Conduct Rules (c) or (d); in such a case, the Sales
                  Partner shall be liable to pay the Company all the amount that
                  he/she has received or would have received in the event of
                  such dealing being successful.
                </li>
              </ul>
            </li>
            <li>
              The Sales Partner may terminate this Agreement with a prior
              written notice of 30 (thirty) days.
            </li>
          </ol>

          <h3 className="font-bold">9. Indemnity</h3>
          <p>
            The Sales Partner agrees to indemnify, defend, and hold harmless the
            Company, its officers, directors, partners and employees from and
            against any claims, liabilities, losses, damages, and expenses
            arising out of or in connection with any breach of this Agreement or
            any unlawful act committed by the Sales Partner.
          </p>

          <h3 className="font-bold">
            10. Governing Law and Dispute Resolution
          </h3>
          <p>
            This Agreement shall be governed by and construed in accordance with
            the laws of India. The Parties agree that in case of any dispute
            arising out of or in connection with this Agreement, the Parties
            shall first endeavour to resolve the dispute amicably by mutual
            co-operation. The Parties further agree that the courts in Nagpur
            shall have the exclusive territorial jurisdiction over any or all
            such disputes arising out of this Agreement.
          </p>

          <h3 className="font-bold">11. Force Majeure</h3>
          <p>
            Neither Party shall be held liable for failure or delay in
            performance of its obligations due to events beyond its reasonable
            control, including but not limited to acts of God, war, riots,
            governmental restrictions, natural disasters, pandemics, or power
            failures.
          </p>

          <h3 className="font-bold">12. Amendment</h3>
          <p>
            No amendment or modification of this Agreement shall be valid unless
            made in writing and signed by both Parties.
          </p>

          <h3 className="font-bold">13. Severability</h3>
          <p>
            If any provision of this Agreement is found to be invalid or
            unenforceable, the remainder of the Agreement shall remain in full
            force and effect.
          </p>

          <h3 className="font-bold">14. Notices</h3>
          <p>
            All notices or communications under this Agreement shall be made
            through electronic mails, on the e-mail address(es) of the Parties
            as mentioned hereunder, or to such other address(es) as may be
            notified in writing:
          </p>
          <ul className="list-disc ml-6">
            <li>
              Email address of the Company –{" "}
              <strong>management@reparv.in</strong>
            </li>
            <li>
              Email address of the Sales Partner –{" "}
              <em>{agreementData?.email}</em>
            </li>
          </ul>

          <h3 className="font-bold">15. Duration</h3>
          <p>
            The Duration of this Agreement shall be twelve (12) months from the
            date of entering into this Agreement. The Agreement shall
            automatically cease to exist and enforceable after the lapse of 12
            months. The Parties may however, renew the Agreement on the same
            terms and conditions or with such amendments as mutually agreed.
          </p>

          <hr className="m-[1-5rem]" />

          <p>
            <strong>IN WITNESS WHEREOF</strong>, the Parties hereto have
            executed this Agreement on this day {currentDate}.
          </p>
          <p className="mt-[1rem]">
            _________________ (For Reparv Services Pvt. Ltd.)
          </p>
          <p>_________________ [Sales Partner]</p>
          <p className="mt-[1rem]">
            I hereby agree to all the terms, conditions and clauses mentioned
            hereinabove and enter into this listing agreement at my own will.
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
