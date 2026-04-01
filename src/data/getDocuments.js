/**
 * Generates the full text content for all 6 onboarding documents.
 * Content is populated dynamically with the agent's form data.
 *
 * Block types used by DocViewer:
 *   h     = centered header
 *   f     = highlighted field (label + value)
 *   p     = paragraph
 *   s     = numbered section  { n: "1", t: "Title", text: "..." }
 *   sub   = indented subsection { l: "(a) Label", text: "..." }
 *   b     = bullet/policy item with gold left border
 *   sig   = broker + associate signature block
 *   sl    = standalone signature line
 */
export function getDocuments(formData) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isBrokerAssociate = formData.licenseType === "broker_associate";
  const licensePrefix = isBrokerAssociate ? "BK/BL" : "SL";

  return {
    /* ═══════════════════════════════════════════════
       ICA-7 — Independent Contractor Agreement
       ═══════════════════════════════════════════════ */
    ica: {
      title: "Independent Contractor Agreement (ICA-7)",
      content: [
        {
          type: "h",
          text: "Independent Contractor Agreement between Broker and Associate\nICA-7 Rev 9/22 · ©2022 Florida Association of REALTORS®",
        },
        { type: "f", label: "Broker", value: "SUN OCEAN REALTY LLC" },
        {
          type: "p",
          text: "is licensed as a real estate broker in the State of Florida and performs acts designated within Chapter 475, Florida Statutes, enjoys goodwill and a reputation for dealing with the public, and maintains an office for the purpose of serving the public as a real estate broker.",
        },
        {
          type: "f",
          label: "Associate",
          value: formData.fullName || "(Your name)",
        },
        {
          type: "p",
          text: `is licensed as a ${isBrokerAssociate ? "☐ sales associate" : "☒ sales associate"} (license number SL${!isBrokerAssociate ? (formData.licenseNumber || "_____") : "____"}) ${isBrokerAssociate ? "☒ broker associate" : "☐ broker associate"} (license number BK/BL${isBrokerAssociate ? (formData.licenseNumber || "_____") : "____"}) in the State of Florida and is properly qualified to deal with the public as such.`,
        },
        {
          type: "p",
          text: `Effective ${today} ("effective date"), Broker and Associate agree to associate pursuant to the following terms and conditions.`,
        },

        /* Section 1 */
        {
          type: "s",
          n: "1",
          t: "Employment Status",
          text: "Broker retains Associate as an independent contractor to assist Broker in the performance of real estate-related activities. With respect to the clients and customers for whom service is performed within the scope of this Agreement, Associate will be construed to be an agent of Broker; otherwise, Associate will not be deemed a servant, employee, joint venturer, or partner of Broker for any purpose. Associate will not be treated as an employee for federal tax purposes with respect to the services performed for Broker under this Agreement. Associate is responsible for paying her/his own estimated income tax payments, self-employment taxes, occupational taxes, and other taxes, if any, to the appropriate governmental entities. Broker will not withhold any taxes from compensation due to Associate, nor will Broker provide worker's compensation insurance for Associate.",
        },

        /* Section 2 */
        {
          type: "s",
          n: "2",
          t: "Associate Responsibilities",
          text: "Associate will use her/his best efforts to procure real estate-related business for Broker and will conduct her/his business in a reputable manner and in conformance with all laws, rules, regulations, and codes of ethics that are binding upon or applicable to real estate licensees, and with Broker's office policy manual, if any.",
        },
        {
          type: "sub",
          l: "(a) Compliance",
          text: "Associate recognizes and acknowledges the obligation to keep abreast of all legal and other issues that affect the real estate industry as they may change from time to time. Associate will not commit any act that violates Florida real estate license law.",
        },
        {
          type: "sub",
          l: "(1) Fair Housing",
          text: "Broker and Broker's company support and practice Fair Housing principles. Associate has been advised that failure to comply with Fair Housing principles will result in appropriate disciplinary action and possible termination of this Agreement. Associate warrants and represents that it is Associate's intent to attend Fair Housing instructional programs, keep current on developments in Fair Housing as it affects real estate marketing and sales, and comply with the Fair Housing laws and regulations.",
        },
        {
          type: "sub",
          l: "(2) Office Policy Manual",
          text: "Broker ☒ maintains ☐ does not maintain an office policy manual. Associate has received a copy and agrees to comply with the manual and such modifications, addenda, and changes as may be incorporated therein from time to time.",
        },
        {
          type: "sub",
          l: "(b) License Renewal; Continuing Education; Dues",
          text: "Associate will be responsible for timely renewing Associate's real estate license and for completing all legally required continuing education in a timely manner and maintaining the records that evidence such completion as required by the Florida Real Estate Commission. Associate will be responsible for paying all license fees, membership dues, and fines.",
        },
        {
          type: "sub",
          l: "(c) Broker Supervision",
          text: "Associate will be deemed to be working under Broker's supervision only to the extent required by Chapter 475, Florida Statutes. Associate will perform all activities, including those activities Broker requires Associate to perform, independently without Broker's supervision or control.",
        },
        {
          type: "sub",
          l: "(d) Broker Property",
          text: "Associate acknowledges that all pending sales and listings taken during the term of this Agreement are Broker's property. All programs, forms, data, keys, manuals, signs, and other paraphernalia relative to the business of Broker are Broker's property, as are all documents and other items pertaining to transactions.",
        },
        {
          type: "sub",
          l: "(e) Property of Others",
          text: "In accordance with Florida law, Associate will deliver to Broker, by the end of the next business day following receipt, any funds or other items that a consumer has entrusted to Associate in connection with a real estate transaction.",
        },
        {
          type: "sub",
          l: "(f) Responsibility",
          text: "Broker will not be liable to Associate for any expenses incurred by Associate nor for any of Associate's acts. Associate will have no authority to bind Broker by any promise or representation, oral or otherwise, unless specifically authorized in writing in a particular transaction. Associate is responsible for providing all tools necessary to perform the duties outlined. Associate will also be responsible for providing Associate's own automobile and is responsible for transportation expenses, including insurance in the minimum coverage amount of $10,000.00 for personal injury protection liability and insurance in the minimum coverage amount of $50,000.00 for bodily injury liability and insurance in the minimum coverage amount of $50,000.00 for property damage liability and other expenses incidental to performing Associate's duties without receiving any reimbursement from Broker. Broker will be named as an additional insured in all such policies.",
        },
        {
          type: "sub",
          l: "(g) Indemnification",
          text: "Associate will indemnify and hold Broker, its officers, directors, and employees harmless from all claims, demands, suits, costs, and expenses, including reasonable attorneys' fees at all levels, of whatever nature and description to the extent based on Associate's representations, acts, omissions, negligence, willful misconduct, or violation of laws, rules, regulations, codes of ethics, this Agreement, or office policy manual.",
        },

        /* Section 3 */
        { type: "s", n: "3", t: "Broker Responsibilities", text: "" },
        {
          type: "sub",
          l: "(a) Access to Listings",
          text: "Broker will provide Associate with access to all current listings of Broker and listings made available to Broker through offers of cooperation, except those listings that Broker, in her/his/its discretion places exclusively in the possession of another associate.",
        },
        {
          type: "sub",
          l: "(b) Access to Facilities",
          text: "Associate may use Broker's then existing office facilities for the performance of Associate's duties as described above.",
        },
        {
          type: "sub",
          l: "(c) Compensation",
          text: "Broker will compensate Associate in proportion to Associate's output with regard to real estate-related activities and not to hours worked by Associate. Such compensation will be solely through commissions as described below or in Broker's office policy manual, if any.",
        },
        {
          type: "sub",
          l: "(1) Amount; Payment",
          text: "When Associate performs any brokerage service for Broker and Broker earns and collects a fee for such service, Broker will pay Associate within _____ days after the funds are collected and have cleared:\n\n100% of the fee as commission for SINGLE PROPERTY SALES\n90% of the fee as commission for SINGLE PROPERTY LEASES, COMMERCIAL LEASES, REFERRALS\n60% of the fee as commission for ANY BROKER PROVIDED LEAD",
        },
        {
          type: "sub",
          l: "(2) Dividing Compensation with Other Licensees",
          text: "If two or more associates participate in rendering a brokerage service to the public, or claim to have done so, Broker will determine, in Broker's sole and absolute discretion, the amount of the fee due Associate.",
        },
        {
          type: "sub",
          l: "(3) Incentives",
          text: "If a seller or listing office offers a premium, bonus, or other incentive, if such premium, incentive, or bonus is in the form of money, then BROKER WILL RECEIVE AND PAY ASSOCIATE. If such incentive is other than money, then such premium, bonus, or incentive will go to ☐ Broker ☒ Associate.",
        },
        {
          type: "sub",
          l: "(4) Benefits",
          text: "Associate will be provided no minimum salary, vacation pay, sick leave, or any other fringe benefit.",
        },
        {
          type: "sub",
          l: "(5) Collection of Fees",
          text: "Broker will not be required to prosecute or sue any party in order to collect any fee for services performed by Associate.",
        },
        {
          type: "sub",
          l: "(6) Compensation after Termination",
          text: "After termination of this Agreement, Broker will pay Associate any amount earned before termination less amounts owed to Broker and amounts Broker must pay another licensee to complete pending transactions for which Associate was responsible before termination.",
        },

        /* Sections 4–9 */
        {
          type: "s",
          n: "4",
          t: "Errors and Omissions Insurance",
          text: "☒ Associate will pay a portion of Errors and Omissions coverage as follows: $100 PER SALE TRANSACTION",
        },
        {
          type: "s",
          n: "5",
          t: "Term; Termination",
          text: "This Agreement will be in effect for 1 year(s) from the effective date. Either party may terminate this Agreement by 7 days' advance written notice to the other party. Broker may terminate this Agreement without notice for wrongful conduct by Associate. Failure by either party to maintain active licensure status pursuant to Chapter 475, Florida Statutes, will be deemed automatic termination. Associate will not, after termination of this Agreement, use to her/his own advantage, or to the advantage of any other person or entity, any information gained from the business of the Broker relating to property for sale, lease, or rental, or Broker's customers or clients. Upon termination of this Agreement, Associate will return all Broker's property to Broker with no copies made or retained by Associate.",
        },
        {
          type: "s",
          n: "6",
          t: "Confidentiality",
          text: "Associate acknowledges that Broker may disclose confidential information to Associate during the course of this Agreement. Any such information that is or should be reasonably understood to be confidential or proprietary to Broker, including mailing lists, customer and client lists, sales, costs, unpublished financial information, product and business plans, projections, marketing data, computer data, computer programs and supporting documentation, and Broker's office policy manual, if any, are considered confidential property of Broker.",
        },
        {
          type: "s",
          n: "7",
          t: "Severability",
          text: "If any provision of this Agreement is or becomes invalid or unenforceable, all remaining provisions will continue to be fully effective.",
        },
        {
          type: "s",
          n: "8",
          t: "Dispute Resolution",
          text: "This Agreement will be construed under Florida law. All disputes between Associate and another associate in Broker's firm will be resolved by Broker. All disputes between Broker and Associate will be mediated under the rules of the American Arbitration Association or other mediator agreed upon by the parties.",
        },
        {
          type: "s",
          n: "9",
          t: "Additional Terms",
          text: "1. Associate acknowledges receipt of and agrees to abide by the Sun Ocean Realty Office Policy Form, as may be amended from time to time.\n\n2. Associate agrees to the terms of any Addendum to this Agreement, including but not limited to the Showing Agent Addendum, which shall be incorporated herein by reference.\n\n3. In the event of conflict between this Agreement and an Addendum, the Addendum shall control.\n\nCompensation:\n$250 flat fee per closed rental showing, paid after commission is received by the Brokerage.\n\nIf Showing Agent self-sources a deal:\nRentals: 90/10 split (Agent keeps 90%).\nSales: $399 transaction fee.\n\nShowing Agent Responsibilities:\nShow assigned rental properties to prospects on behalf of Sun Ocean Realty when available.\nCommunicate promptly with the Rental Coordinator or Broker regarding scheduling and client updates.\nSubmit all showing feedback and assist as requested until application/lease signing.",
        },
        {
          type: "sig",
          broker: "ENRIQUE L GUILLEN",
          brokerDate: "1/1/26",
          brokerage: "SUN OCEAN REALTY",
        },
      ],
    },

    /* ═══════════════════════════════════════════════
       Office Policy Form
       ═══════════════════════════════════════════════ */
    policy: {
      title: "Sun Ocean Realty Office Policy Form",
      content: [
        { type: "h", text: "Sun Ocean Realty Office Policy Form" },
        { type: "p", text: "The undersigned Agent or Employee of Sun Ocean Realty acknowledges receipt of the following rules and policies." },
        { type: "p", text: "As a condition of his/her association or employment with Sun Ocean Realty the Agent or Employee agrees to abide by the terms of this agreement." },
        { type: "p", text: "Failure to abide by these policies as adopted and amended will be grounds for disciplinary action of the agent or employee including termination of association or employment. Agent specifically understands and acknowledges the following timeframes and financial penalties that will be imposed for failure to comply with the referenced agent responsibilities:" },
        { type: "b", l: "ASSOCIATION MEMBERSHIP", text: "Associates of Sun Ocean Realty are required to join one of the following: The Miami Association of Realtors, The Fort Lauderdale/Palm Beaches, St Lucie Association, Orlando Association of Realtors or The Greater Tampa Realtor Association. Agents that choose not to join an Association must notify the Broker via email so that they can be transferred to our non-affiliated entity." },
        { type: "b", l: "PAYMENTS", text: "Broker pays Associate commissions daily at 11AM EST MON-FRI providing deposited funds for the transaction have been cleared and made available by the bank. Broker can pay commission via direct deposit / ACH or E-Check as long as Associate has provided Broker with: 1) Disclosures, 2) Purchase/Sale or Lease Contract, 3) Listing Agreements, 4) Addendums, 5) HUD & any other related docs prior to closing." },
        { type: "b", l: "PROPERTY MANAGEMENT", text: "Agents are expressly prohibited from performing any type of property management. Agents may list and find customers' rentals." },
        { type: "b", l: "ESCROW", text: "Sun Ocean Realty does not hold Earnest Money." },
        { type: "b", l: "TURNING IN FILES", text: "All required documents must be sent within 48 hours to the office, but in no event later than five (5) business days after execution. Broker prefers Contracts/Listings agreements & HUDs be uploaded on the virtual back office located on SunOceanRealty.NET." },
        { type: "b", l: "PENALTIES", text: "The State can fine Sun Ocean Realty for non compliance. Any file not submitted to the office within 5 business days of execution will be subject to a company penalty of the lesser of $500 or 30% of the commission due to the agent." },
        { type: "b", l: "PERSONAL SALES & PURCHASES", text: "When an associate buys or sells personal real estate, the seller or buyer must be informed of the associate's license status and must be aware that the associate is not representing the interest of the other party." },
        { type: "b", l: "CLOSING FILES", text: "All disbursement order requests must be submitted on the online agent portal with all documents for the transaction at sunoceanrealty.NET" },
        { type: "b", l: "ADD/EDIT CLASS", text: "All Agents are required to take the add/edit class through the Association if they want to be able to enter their listings into the MLS on their own. Sun Ocean Realty will charge a $100 fee for each listing that we enter for you." },
        { type: "sl" },
      ],
    },

    /* ═══════════════════════════════════════════════
       Showing Agent Addendum
       ═══════════════════════════════════════════════ */
    showing: {
      title: "Showing Agent Addendum",
      content: [
        { type: "h", text: "Independent Contractor Agreement – Showing Agent Addendum" },
        { type: "p", text: "Broker: Enrique Luis Guillen, Florida Broker, License #3265449" },
        { type: "f", label: "Associate (Showing Agent)", value: `${formData.fullName || "___"}, License # ${licensePrefix}${formData.licenseNumber || "___"}` },
        { type: "s", n: "", t: "Role", text: "Associate is engaged as a Showing Agent for Sun Ocean Realty to assist with rental showings assigned by the Broker or a designated Rental Coordinator." },
        { type: "s", n: "", t: "Responsibilities", text: "• Conduct rental property showings for prospects as assigned.\n• Communicate promptly with Broker/Coordinator regarding scheduling and client updates.\n• Submit required documents and feedback in line with Sun Ocean Realty Office Policy.\n• Represent the company professionally at all times." },
        { type: "s", n: "", t: "Compensation", text: "• $250 flat fee per closed showing, paid once commission is received by Sun Ocean Realty.\n• Self-generated rentals: 90/10 split (Associate keeps 90%).\n• Sales transactions: $399 transaction fee per file." },
        { type: "s", n: "", t: "Growth Opportunity", text: "• Showing Agents may transition into Rental Coordinator or full Associate roles based on performance.\n• Additional opportunities may include working their own pipeline of clients under standard Sun Ocean Realty splits." },
        { type: "s", n: "", t: "Terms", text: "This Addendum is incorporated into the Independent Contractor Agreement.\nIn the event of conflict, this Addendum shall control.\nAssociate remains an independent contractor and is responsible for all taxes, insurance, and expenses." },
        { type: "p", text: "By signing below, both parties agree to the terms of this Showing Agent Addendum." },
        { type: "sig", broker: "Enrique Luis Guillen", brokerDate: "1/1/26", brokerage: "Sun Ocean Realty" },
      ],
    },

    /* ═══════════════════════════════════════════════
       Agent Annual Subscription Agreement
       ═══════════════════════════════════════════════ */
    subscription: {
      title: "Agent Annual Subscription Agreement",
      content: [
        { type: "h", text: "Agent Annual Subscription Agreement" },
        { type: "p", text: 'This Agreement is between Sun Ocean Realty LLC ("Brokerage") and the undersigned real estate agent ("Associate"). By signing, the Associate agrees to the terms below.' },
        { type: "s", n: "", t: "Annual Subscription Fee", text: "• $99 per year, due at signup.\n• Non-refundable.\n• Automatically charged each year on the same signup date to the card/bank account on file." },
        { type: "s", n: "", t: "Subscription Includes", text: "• Full brokerage affiliation\n• Online CRM + office tools\n• Lead distribution (for showing agents)\n• Full broker support\n• No desk fees, tech fees, or monthly fees" },
        { type: "s", n: "", t: "Refund Policy", text: "All subscription fees are strictly non-refundable." },
        { type: "s", n: "", t: "Agent Acknowledgment", text: "By signing, the Agent understands and accepts the automatic billing terms, non-refundability, and agrees to follow all brokerage policies." },
        { type: "p", text: "Broker of Record – Sun Ocean Realty LLC\nSignature: Eric Guillen" },
        { type: "sl" },
      ],
    },

    /* ═══════════════════════════════════════════════
       DBPR RE 11 — Change of Status
       ═══════════════════════════════════════════════ */
    dbpr: {
      title: "DBPR RE 11 – Change of Status",
      content: [
        { type: "h", text: "State of Florida — DBPR RE 11\nChange of Status for Sales Associates and Broker Sales Associates" },
        { type: "s", n: "", t: "Section I – Transaction Type", text: "☒ Change Employer [9007]" },
        { type: "s", n: "", t: "Section II – Associate Information", text: `License Number: ${licensePrefix}${formData.licenseNumber || "_____"}\nName: ${formData.fullName || "_____"}\nPhone: ${formData.phone || "_____"}\nEmail: ${formData.email || "_____"}` },
        { type: "s", n: "", t: "Section III – Company Information", text: "Qualifying Broker: Guillen, Enrique L\nCompany License: C1056011\nCompany: Sun Ocean Realty LLC\nPhone: 954-357-2807\nEmail: broker@sunoceanrealty.com" },
        { type: "s", n: "", t: "Section IV – Affirmation", text: "I certify that I am empowered to execute this application as required by Section 559.79, Florida Statutes. I understand that my signature on this written declaration has the same legal effect as an oath or affirmation. Under penalties of perjury, I declare that I have read the foregoing application and the facts stated in it are true. I understand that falsification of any material information on this application may result in criminal penalty or administrative action, including a fine, suspension or revocation of the license." },
        { type: "sl" },
      ],
    },

    /* ═══════════════════════════════════════════════
       Form W-9
       ═══════════════════════════════════════════════ */
    w9: {
      title: "Form W-9 – Taxpayer Identification",
      content: [
        { type: "h", text: "Form W-9 (Rev. March 2024)\nRequest for Taxpayer Identification Number and Certification\nDepartment of the Treasury — Internal Revenue Service" },
        { type: "f", label: "1. Name", value: formData.fullName || "_____" },
        { type: "f", label: "2. Business name", value: formData.bizName || "(if applicable)" },
        {
          type: "f",
          label: "3a. Tax classification",
          value:
            formData.taxClass === "individual"
              ? "☒ Individual/sole proprietor"
              : `☒ LLC (${formData.taxClass.replace("llc_", "").toUpperCase()})`,
        },
        {
          type: "f",
          label: "5. Address",
          value: formData.address
            ? `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`
            : "_____",
        },
        { type: "s", n: "", t: "Part I – TIN", text: "Enter your TIN in the appropriate box. The TIN provided must match the name given on line 1 to avoid backup withholding." },
        {
          type: "s",
          n: "",
          t: "Part II – Certification",
          text: "Under penalties of perjury, I certify that:\n\n1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and\n\n2. I am not subject to backup withholding because (a) I am exempt from backup withholding, or (b) I have not been notified by the IRS that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding; and\n\n3. I am a U.S. citizen or other U.S. person; and\n\n4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.",
        },
        { type: "sl" },
      ],
    },
  };
}
