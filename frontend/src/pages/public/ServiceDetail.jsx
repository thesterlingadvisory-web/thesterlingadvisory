import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2, ArrowRight, FileText, Clock, CreditCard,
  ShieldAlert, Building2, Calculator, ShieldCheck, Scale,
  Landmark, BarChart2, Users, Award, TrendingUp, Star,
  Phone, MessageCircle, ChevronRight, CheckCircle
} from 'lucide-react';
import { getServiceBySlug, serviceCategories } from '../../data/services';

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

const categoryIconMap = {
  Landmark, BarChart2, Users, Shield: ShieldCheck, CheckCircle2, TrendingUp,
};

const serviceContent = {
  'proprietorship-setup': {
    overview: 'A Sole Proprietorship is a business owned and managed by one person. It is commonly chosen by shop owners, freelancers, consultants, online sellers, and other small businesses. There is no separate registration for a Sole Proprietorship in India. Depending on your business, registrations such as GST, Udyam (MSME), FSSAI, or Shops & Establishments may be required to operate legally.',
    features: [
      'Single owner business',
      'Easy to start and manage',
      'Complete control over business',
      'Minimal compliances',
      'Suitable for small businesses and professionals',
      'No separate legal entity'
    ],
    eligibility: [
      'Any individual can start a Sole Proprietorship.',
      'The applicant should be at least 18 years of age.',
      'The business should carry out a lawful commercial activity.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Passport-size Photograph',
      'Mobile Number & Email ID',
      'Business Address Proof'
    ],
    agencyDocuments: [
      'Assessment of applicable registrations',
      'Preparation of government forms',
      'End-to-end filing with the concerned department',
      'Application tracking and status updates'
    ],
    whyUs: [
      'Udyam (MSME) Registration & Central Priority Certificate Allocation',
      'GST Identification Number (GSTIN) Registration & Jurisdictional Setup',
      'Shops & Establishment Act (State Municipal / Gumasta) Commercial Licensing',
      'Bank Current Account Onboarding Documentation & RBI KYC Advisory'
    ],
  },
  'partnership-firm-registration': {
    overview: 'A Partnership Firm is a business where two or more people come together to run a business and share its profits and losses. The rights and responsibilities of the partners are defined in a Partnership Deed. The partnership may be registered with the Registrar of Firms under the Indian Partnership Act, 1932, to obtain legal recognition.',
    features: [
      'Owned by two or more partners',
      'Governed by a Partnership Deed',
      'Shared profits and responsibilities',
      'Simple business structure',
      'Registration is optional under law',
      'Suitable for family businesses and small enterprises'
    ],
    eligibility: [
      'Minimum two partners.',
      'Partners can be individuals or eligible legal entities.',
      'The partnership should carry out a lawful business activity.'
    ],
    clientDocuments: [
      'PAN Card of all Partners',
      'Aadhaar Card of all Partners',
      'Passport-size Photographs',
      'Mobile Number & Email ID',
      'Business Address Proof'
    ],
    agencyDocuments: [
      'Partnership Deed Drafting',
      'Registration Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Custom constitutional partnership deed drafting', 'State-specific Registrar of Firms representation', 'Corporate PAN & TAN allocation', 'Retainer-led statutory follow-up'],
  },
  'llp-registration': {
    overview: 'A Limited Liability Partnership (LLP) is a business structure where two or more people own and manage a business together. Unlike a Partnership Firm, an LLP is a separate legal entity, meaning it can own property, enter into contracts, and continue to exist in its own name. LLP registration legally incorporates the business under the LLP Act, 2008.',
    features: [
      'Separate legal entity',
      'Limited liability for partners',
      'Perpetual succession',
      'Flexible management structure',
      'Suitable for professionals and businesses',
      'Can own property and assets'
    ],
    eligibility: [
      'Minimum two Designated Partners.',
      'At least one Designated Partner should be an Indian resident.',
      'A registered office address in India is required.'
    ],
    clientDocuments: [
      'PAN Card of all Partners',
      'Aadhaar Card of all Partners',
      'Passport-size Photographs',
      'Mobile Number & Email ID',
      'Registered Office Address Proof',
      'NOC from the Property Owner (if applicable)'
    ],
    agencyDocuments: [
      'Digital Signature Certificate (DSC) Application',
      'LLP Name Reservation',
      'LLP Agreement Drafting',
      'Government Incorporation Forms',
      'Application tracking and status updates'
    ],
    whyUs: ['Class 3 DSC and Designated Partner DIN allocation', 'Precision MCA FiLLiP statutory filing', 'LLP Agreement constitutional drafting', 'Permanent annual ROC compliance tracking'],
  },
  'private-limited-company': {
    overview: 'A Private Limited Company is a business structure that has a separate legal identity from its owners. This allows the company to own property, enter into contracts, open bank accounts, and continue to exist even if its shareholders or directors change. It is commonly chosen by startups, growing businesses, manufacturers, traders, and businesses planning to raise investment.',
    features: [
      'Separate legal entity',
      'Limited liability for shareholders',
      'Perpetual succession',
      'Better business credibility',
      'Ownership through shares',
      'Suitable for startups and growing businesses'
    ],
    eligibility: [
      'Minimum two Directors.',
      'Minimum two Shareholders.',
      'At least one Director should be an Indian resident.',
      'A registered office address in India is required.'
    ],
    clientDocuments: [
      'PAN Card of all Directors',
      'Aadhaar Card of all Directors',
      'Passport-size Photographs',
      'Mobile Number & Email ID',
      'Registered Office Address Proof',
      'NOC from the Property Owner (if applicable)'
    ],
    agencyDocuments: [
      'Digital Signature Certificate (DSC) Application',
      'Company Name Reservation',
      'Memorandum of Association (MoA)',
      'Articles of Association (AoA)',
      'Government Incorporation Forms',
      'Application tracking and status updates'
    ],
    whyUs: ['Complete SPICe+ constitutional incorporation', 'Memorandum & Articles (MoA & AoA) drafting', 'Director Identification Number (DIN) & DSC allocation', 'Statutory bank account opening authorization'],
  },
  'opc-registration': {
    overview: 'A One Person Company (OPC) is a type of company that can be incorporated by a single individual. Unlike a Sole Proprietorship, an OPC is a separate legal entity, which means the company and its owner are treated as different legal persons. It is suitable for individuals who want to run a business on their own while operating through a registered company under the Companies Act, 2013.',
    features: [
      'Single owner company',
      'Separate legal entity',
      'Limited liability of the member',
      'Perpetual succession',
      'Owned and managed by one person',
      'Incorporated under the Companies Act, 2013'
    ],
    eligibility: [
      'One individual can incorporate an OPC.',
      'A nominee must be appointed at the time of incorporation.',
      'A registered office address in India is required.',
      'The proposed company name should be available for approval by the Ministry of Corporate Affairs (MCA).'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Passport-size Photograph',
      'Mobile Number & Email ID',
      'Registered Office Address Proof',
      'No Objection Certificate (NOC) from the Property Owner (if applicable)'
    ],
    agencyDocuments: [
      'Digital Signature Certificate (DSC) Application',
      'Company Name Reservation Application',
      'Memorandum of Association (MoA)',
      'Articles of Association (AoA)',
      'Government Incorporation Forms',
      'Application tracking and status updates'
    ],
    whyUs: ['Complete MCA incorporation execution', 'Statutory nominee identification drafting', 'Director DIR-3 KYC compliance', 'Annual statutory filing roadmap'],
  },
  'section-8-company': {
    overview: 'A Section 8 Company is a company formed to promote charitable, educational, social, religious, environmental, sports, research, or similar non-profit objectives. Unlike a regular company, its profits cannot be distributed to its members and must be used only to achieve the company\'s objectives. It is registered under the Companies Act, 2013 and is commonly used by NGOs, charitable organisations, educational institutions, and social welfare organisations.',
    features: [
      'Non-profit company structure',
      'Separate legal entity',
      'Limited liability of members',
      'Perpetual succession',
      'Profits are used only for the company\'s objectives',
      'Registered under the Companies Act, 2013'
    ],
    eligibility: [
      'Minimum two Directors.',
      'Minimum two Members.',
      'The company must be formed for a lawful non-profit objective.',
      'A registered office address in India is required.'
    ],
    clientDocuments: [
      'PAN Card of all Directors',
      'Aadhaar Card of all Directors',
      'Passport-size Photographs',
      'Mobile Number & Email ID',
      'Registered Office Address Proof',
      'No Objection Certificate (NOC) from the Property Owner (if applicable)'
    ],
    agencyDocuments: [
      'Digital Signature Certificate (DSC) Application',
      'Company Name Reservation Application',
      'Memorandum of Association (MoA)',
      'Articles of Association (AoA)',
      'Section 8 Licence Application',
      'Government Incorporation Forms',
      'Application tracking and status updates'
    ],
    whyUs: ['Section 8 statutory license procurement', '12A & 80G tax exemption structuring', 'FCRA eligibility advisory', 'Annual non-profit statutory audit retainers'],
  },
  'trust-registration': {
    overview: 'A Trust is a legal arrangement where a person (known as the Settlor) transfers property or assets to one or more Trustees, who manage them for the benefit of a person, family, community, or charitable purpose. The terms of the trust are set out in a Trust Deed. Trusts are commonly formed for charitable, religious, educational, or family purposes.',
    features: [
      'Created through a Trust Deed',
      'Managed by one or more Trustees',
      'Can hold property and other assets',
      'Suitable for charitable, religious, educational, and family purposes',
      'Clearly defines the powers and responsibilities of Trustees',
      'Legally recognised under the applicable law'
    ],
    eligibility: [
      'A Settlor to create the Trust.',
      'One or more Trustees to manage the Trust.',
      'A lawful objective.',
      'Trust property or an initial trust fund.'
    ],
    clientDocuments: [
      'PAN Card of the Settlor and Trustees',
      'Aadhaar Card of the Settlor and Trustees',
      'Passport-size Photographs',
      'Mobile Number & Email ID',
      'Address Proof of the Settlor and Trustees',
      'Registered Office/Trust Address Proof'
    ],
    agencyDocuments: [
      'Trust Deed Drafting',
      'Registration Application',
      'Government Filing',
      'Supporting Declarations (where required)',
      'Application tracking and status updates'
    ],
    whyUs: ['Fiduciary trust deed drafting by specialized counsel', 'Sub-registrar jurisdictional representation', '12A & 80G tax exemption filings', 'Multi-state charitable trust compliance'],
  },
  'society-registration': {
    overview: 'A Society is an association of people who come together to work towards a charitable, educational, cultural, scientific, literary, religious, sports, or social objective. It is commonly formed by NGOs, schools, colleges, clubs, Resident Welfare Associations (RWAs), and other non-profit organisations. Society registration gives the organisation legal recognition under the applicable law.',
    features: [
      'Formed by a group of individuals',
      'Managed by a governing body',
      'Suitable for non-profit organisations',
      'Separate legal identity for the registered society',
      'Can own property in its name',
      'Registered under the applicable law'
    ],
    eligibility: [
      'The minimum number of members should be as prescribed under the applicable law.',
      'The society should be formed for a lawful non-profit objective.',
      'A registered office address is required.',
      'A governing body should be appointed to manage the society.'
    ],
    clientDocuments: [
      'PAN Card of all Members',
      'Aadhaar Card of all Members',
      'Passport-size Photographs',
      'Mobile Number & Email ID',
      'Registered Office Address Proof',
      'No Objection Certificate (NOC) from the Property Owner (if applicable)'
    ],
    agencyDocuments: [
      'Memorandum of Association (MoA) of the Society',
      'Rules & Regulations Drafting',
      'Registration Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Constitutional memorandum & rules drafting', 'Registrar of Societies statutory filing', 'Governing body compliance advisory', 'Annual list of governing body filings'],
  },
  'gst-registration': {
    overview: 'Goods and Services Tax (GST) is an indirect tax applicable to the supply of most goods and services in India. Businesses that meet the conditions prescribed under GST law are required to obtain GST registration. Once registered, the business receives a GST Identification Number (GSTIN), which is used for GST compliance and other business transactions.',
    features: [
      'GST Identification Number (GSTIN)',
      'Single registration for GST compliance',
      'Enables collection of GST (where applicable)',
      'Eligible to claim Input Tax Credit (subject to GST law)',
      'Online registration process',
      'Valid across India'
    ],
    eligibility: [
      'Businesses required to register under the GST Act.',
      'Businesses making inter-state taxable supplies, where registration is applicable.',
      'E-commerce sellers and other businesses required to register under GST.',
      'Persons applying for voluntary GST registration.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Passport-size Photograph',
      'Mobile Number & Email ID',
      'Business Address Proof',
      'Bank Account Details',
      'Business Constitution Details (Proprietorship, Partnership, LLP or Company)'
    ],
    agencyDocuments: [
      'GST Registration Application',
      'Aadhaar Authentication Assistance (where applicable)',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Aadhaar verification and officer representation', 'Pan-India multi-jurisdictional filings', 'Principal Place of Business structuring', 'Ongoing monthly & quarterly return retainers'],
  },
  'gst-amendment': {
    overview: 'If there is any change in your GST registration details, such as your business name, address, mobile number, email ID, authorised signatory, or other registration details, the information should be updated on the GST portal. A GST Amendment helps keep your registration details accurate and up to date.',
    features: [
      'Update GST registration details',
      'Add or update business locations',
      'Change authorised signatory',
      'Update contact details',
      'Online amendment process',
      'Helps maintain accurate GST records'
    ],
    eligibility: [
      'Businesses already registered under GST.',
      'Any registered person requiring changes to their GST registration details.'
    ],
    clientDocuments: [
      'GST Registration Certificate',
      'Supporting documents for the proposed amendment',
      'PAN Card (where applicable)',
      'Business Address Proof (if applicable)',
      'Authorisation Letter (where applicable)'
    ],
    agencyDocuments: [
      'GST Amendment Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Rapid jurisdictional amendment filings', 'Pre-cancellation liability audits', 'Final GSTR-10 statutory return filing', 'Authority notice representation'],
  },
  'pan-tan-tds-services': {
    overview: 'A Permanent Account Number (PAN) is a unique number issued by the Income Tax Department. A Tax Deduction and Collection Account Number (TAN) is required by persons liable to deduct or collect tax at source (TDS). TDS is a system where tax is deducted while making certain payments like salary, rent, and professional fees. When businesses are required to comply with TDS, they must obtain a TAN.',
    features: [
      'PAN issued by the Income Tax Department',
      'TAN required for TDS/TCS compliance',
      'Unique identification numbers',
      'Required for filing TDS returns',
      'Applicable to eligible deductors and businesses'
    ],
    eligibility: [
      'Individuals and entities requiring a PAN.',
      'Persons required to deduct TDS under the Income-tax Act.',
      'Employers deducting TDS from salary or making applicable payments.'
    ],
    clientDocuments: [
      'Identity Proof',
      'Address Proof',
      'Passport-size Photograph (where applicable)',
      'Mobile Number & Email ID',
      'Business Registration Proof (if applicable)'
    ],
    agencyDocuments: [
      'PAN/TAN Application & TDS Registration',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Corporate PAN & TAN allotment', 'Quarterly TDS return e-filing (Form 24Q/26Q)', 'Form 16/16A generation', 'TDS mismatch resolution (Traces)'],
  },
  'professional-tax': {
    overview: 'Professional Tax is a tax levied by certain State Governments on professions, trades, employment, and businesses. The requirement to obtain Professional Tax registration depends on the laws of the respective state. Employers and, in some states, professionals and businesses may be required to register and comply with the applicable provisions.',
    features: [
      'State-specific registration',
      'Applicable in notified states',
      'Online registration in many states',
      'Separate registration and enrolment where applicable',
      'Helps comply with state tax laws',
      'Applicable to eligible employers and businesses'
    ],
    eligibility: [
      'Employers covered under the applicable state law.',
      'Professionals and businesses required to register under the respective state\'s Professional Tax law.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Business Address Proof',
      'Business Registration Proof (if available)',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'Professional Tax Registration Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['State-specific Employer & Employee PT Enrolment', 'Monthly salary deduction matrix setup', 'Statutory monthly & annual return filing', 'Multi-state enterprise compliance'],
  },

  'epf-registration': {
    overview: 'The Employees\' Provident Fund (EPF) is a government-backed retirement savings scheme for employees. Businesses covered under the EPF law must register and contribute to the fund for eligible employees. This helps employees build retirement savings while they are working.',
    whyUs: ['Shram Suvidha unified portal registration', 'DSC-authenticated establishment filing', 'Monthly ECR return management', 'PF inspection and audit defense'],
  },
  'esic-registration': {
    overview: 'The Employees\' State Insurance Corporation (ESIC) is a government scheme that provides medical care and other benefits to eligible employees and their families. Businesses covered under the ESI law must register and make contributions for eligible employees.',
    whyUs: ['Shram Suvidha ESIC code allocation', 'Employee Insurance Number (IP) generation', 'Monthly contribution return filings', 'Accident and medical compliance tracking'],
  },
  'lin-registration': {
    overview: 'A Labour Identification Number (LIN) is a unique number issued through the Shram Suvidha Portal. It helps identify an establishment under various labour laws and simplifies communication and compliance with labour authorities.',
    whyUs: ['Unified Shram Suvidha allocation', 'Multi-law statutory mapping', 'Inspection readiness audits', 'Annual consolidated labour returns'],
  },
  'clra-registration': {
    overview: 'The Contract Labour (Regulation and Abolition) Act applies to certain establishments that engage contract workers through contractors. Eligible businesses are required to obtain registration as the Principal Employer, while contractors may also need a licence under the Act.',
    whyUs: ['Principal Employer statutory registration', 'Contractor licensing supervision', 'State labour commissioner liaison', 'Annual contract labour return filing'],
  },
  'shops-establishments': {
    overview: 'Shops & Establishments Registration is required for shops, offices, restaurants, cafes, salons, clinics, warehouses, startups, and other commercial establishments, as prescribed under the applicable state law. It provides legal recognition to the business establishment and helps comply with state labour regulations.',
    features: [
      'Legal recognition of the establishment',
      'State-specific registration',
      'Applicable to commercial establishments',
      'Online registration in many states',
      'Helps comply with labour laws',
      'Required under the applicable state law'
    ],
    eligibility: [
      'Shops and commercial establishments covered under the applicable state law.',
      'Businesses operating from a commercial establishment.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Business Address Proof',
      'Passport-size Photograph',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'Registration Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Pan-India state municipal licensing', 'Commercial electricity & water tariff conversion advisory', 'Intimation of commencement filings', 'Renewal & amendment lifecycle management'],
  },
  'trade-licence': {
    overview: 'A Trade Licence is issued by the local Municipal Corporation or local authority to allow eligible businesses to carry on specific business activities within its jurisdiction. It is commonly required for businesses such as restaurants, salons, bakeries, retail shops, warehouses, clinics, and other businesses, depending on local municipal rules.',
    features: [
      'Issued by the local authority',
      'Applicable to specified businesses',
      'Location-specific licence',
      'Helps comply with municipal regulations',
      'Online application in many cities'
    ],
    eligibility: [
      'Businesses covered under the applicable municipal laws.',
      'Valid business premises within the local authority\'s jurisdiction.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Business Address Proof',
      'Identity Proof',
      'Passport-size Photograph'
    ],
    agencyDocuments: [
      'Trade Licence Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Local municipal corporation liaising', 'Health & sanitation NOC integration', 'Zoning law compliance checks', 'Multi-outlet municipal licensing strategy'],
  },
  'factory-licence': {
    overview: 'A Factory Licence is required for manufacturing units that qualify as a factory under the applicable law. It allows eligible factories to operate after complying with the prescribed safety, health, and welfare requirements.',
    features: [
      'Applicable to eligible manufacturing units',
      'Issued under the applicable factory laws',
      'Helps ensure workplace safety',
      'Required before commencing operations in applicable cases',
      'Online application in many states'
    ],
    eligibility: [
      'Manufacturing units covered under the applicable factory laws.',
      'Factories meeting the prescribed legal requirements.'
    ],
    clientDocuments: [
      'PAN Card',
      'Business Registration Proof',
      'Factory Address Proof',
      'Identity Proof of the Applicant',
      'Details of Manufacturing Activity'
    ],
    agencyDocuments: [
      'Factory Licence Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Factory layout plan approval (Directorate of Industrial Safety)', 'State Pollution Control Board (Consent to Establish/Operate) mapping', 'Chief Inspector of Factories (CIF) representation', 'Statutory compliance registers & return setup'],
  },
  'trademark-registration': {
    overview: 'A Trademark is a unique brand name, logo, slogan, symbol, or tagline that helps customers identify your business or products. Trademark registration gives you the exclusive legal right to use your trademark and helps protect your brand from unauthorized use by others.',
    features: [
      'Protects your brand identity',
      'Exclusive rights over the registered trademark',
      'Can be renewed from time to time',
      'Applicable across India',
      'Helps protect against unauthorized use',
      'Registered under the Trade Marks Act, 1999'
    ],
    eligibility: [
      'Individuals',
      'Proprietorships',
      'Partnership Firms',
      'LLPs',
      'Companies',
      'Trusts and Societies'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Brand Name or Logo',
      'Business Details',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'Trademark Search',
      'Trademark Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Pre-filing trademark viability search', 'Class-wise classification advisory', 'Objection reply & hearing representation', 'Trademark watch & infringement advisory'],
  },
  'copyright-registration': {
    overview: 'Copyright protects original creative works such as books, music, software, photographs, videos, artwork, website content, and other creative content. Copyright registration serves as legal evidence of ownership and helps protect your work against unauthorized copying or use.',
    features: [
      'Protects original creative works',
      'Legal evidence of ownership',
      'Applicable to various creative works',
      'Registered under the Copyright Act, 1957',
      'Helps protect against unauthorized copying'
    ],
    eligibility: [
      'Individuals',
      'Businesses',
      'Authors',
      'Artists',
      'Software Developers',
      'Other creators of original works'
    ],
    clientDocuments: [
      'Identity Proof',
      'Address Proof',
      'Copy of the Original Work',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'Copyright Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Diary number allotment tracking', 'Work-specific class determination', 'Copyright Board hearing representation', 'NOC & deed of assignment drafting'],
  },
  'design-registration': {
    overview: 'A Design Registration protects the unique shape, pattern, configuration, or appearance of a product. It protects only the way a product looks and does not protect how the product works or functions. It is commonly used for products with a unique visual design.',
    features: [
      'Protects the visual appearance of a product',
      'Exclusive rights over the registered design',
      'Registered under the Designs Act, 2000',
      'Helps prevent unauthorized copying of the design',
      'Applicable to eligible industrial designs'
    ],
    eligibility: [
      'Individuals',
      'Proprietorships',
      'Partnership Firms',
      'LLPs',
      'Companies'
    ],
    clientDocuments: [
      'Identity Proof',
      'Address Proof',
      'Drawings or Images of the Design',
      'Product Details',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'Design Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Representation before the Controller of Designs', 'Drawing & perspective view formatting', 'Design novelty & prior art searches', 'Infringement notice drafting'],
  },
  'patent-registration': {
    overview: 'A Patent protects a new invention or process that is novel, useful, and capable of industrial application. It gives the inventor exclusive rights over the invention for a limited period, subject to the provisions of the Patents Act, 1970. Patent registration helps protect eligible inventions from being made, used, or sold without permission.',
    features: [
      'Protects eligible inventions',
      'Exclusive rights over the patented invention',
      'Registered under the Patents Act, 1970',
      'Applicable to products and processes',
      'Helps protect intellectual property'
    ],
    eligibility: [
      'Individual inventors',
      'Startups',
      'Businesses',
      'Research institutions',
      'Joint inventors'
    ],
    clientDocuments: [
      'Identity Proof',
      'Address Proof',
      'Details of the Invention',
      'Drawings or Technical Documents (if applicable)',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'Patent Application',
      'Specification Drafting Support',
      'Government Filing',
'Application tracking and status updates'
    ],
    whyUs: ['Provisional & complete specification drafting', 'Global prior art searches', 'Patent cooperation treaty (PCT) filings', 'FER (First Examination Report) defense'],
  },
  'udyam-registration': {
    overview: 'Udyam Registration is the official registration for Micro, Small, and Medium Enterprises (MSMEs) in India. It helps eligible businesses obtain recognition as an MSME under the Ministry of Micro, Small and Medium Enterprises. Manufacturers, traders, and service providers can apply if they meet the prescribed eligibility criteria.',
    features: [
      'Official MSME registration',
      'Online registration process',
      'Issued by the Government of India',
      'Applicable to eligible businesses',
      'Permanent registration number',
      'Digital registration certificate'
    ],
    eligibility: [
      'Proprietorships',
      'Partnership Firms',
      'LLPs',
      'Private Limited Companies',
      'OPCs',
      'Other eligible business entities meeting the MSME criteria'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Business Details',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'Udyam Registration Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Aadhaar/PAN API integration', 'NIC code optimization for maximum scheme eligibility', 'Priority sector lending classification advisory', 'MSME Samadhaan delayed payment support'],
  },
  'gem-registration': {
    overview: 'The Government e-Marketplace (GeM) is an online platform where government departments and public sector organisations purchase goods and services. GeM Registration allows eligible businesses to list their products or services and participate in government procurement through the GeM portal.',
    features: [
      'Government e-procurement platform',
      'Sell goods and services to government buyers',
      'Online registration process',
      'Product and service listing',
      'Access to government procurement opportunities'
    ],
    eligibility: [
      'Proprietorships',
      'Partnership Firms',
      'LLPs',
      'Companies',
      'Trusts',
      'Other eligible business entities'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Business Registration Proof',
      'Bank Account Details',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'GeM Registration Application',
      'Seller Profile Setup',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['OEM vs Reseller panel structuring', 'Direct purchase & L1 bidding advisory', 'Caution money & vendor assessment facilitation', 'Catalogue mapping and listing'],
  },
  'nsic-registration': {
    overview: 'National Small Industries Corporation (NSIC) Registration is available for eligible Micro and Small Enterprises (MSEs). It helps eligible businesses participate in government procurement schemes and avail benefits offered under the applicable NSIC programmes.',
    features: [
      'Registration for eligible Micro and Small Enterprises',
      'Online application process',
      'Government recognition',
      'Access to applicable NSIC schemes',
      'Support for government procurement'
    ],
    eligibility: [
      'Eligible Micro and Small Enterprises (MSEs).',
      'Businesses meeting the prescribed NSIC requirements.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Business Registration Proof',
      'Business Address Proof',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'NSIC Registration Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Single point registration scheme (SPRS) execution', 'Earnest Money Deposit (EMD) exemption advisory', 'Tender capacity assessment mapping', 'Inspection readiness support'],
  },
  'startup-india-recognition': {
    overview: 'Startup India is a flagship Government of India initiative. The Department for Promotion of Industry and Internal Trade (DPIIT) grants official recognition to eligible startups under this initiative. It recognises innovative businesses that meet the prescribed conditions and enables them to apply for various government schemes, incentives, and startup support programmes.',
    features: [
      'Official recognition by DPIIT under Startup India',
      'Online application process',
      'Recognition certificate',
      'Access to applicable startup support schemes',
      'Applicable to eligible startups'
    ],
    eligibility: [
      'Eligible startups meeting the Startup India & DPIIT criteria.',
      'Businesses incorporated in accordance with the applicable laws.'
    ],
    clientDocuments: [
      'PAN Card',
      'Certificate of Incorporation',
      'Business Details',
      'Mobile Number & Email ID',
      'Brief Description of the Business'
    ],
    agencyDocuments: [
      'Startup India & DPIIT Recognition Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Innovation & scalability pitch drafting', 'Form-1 statutory tax holiday application', 'Section 80-IAC tax holiday filing', 'Strategic IP fast-track advisory'],
  },
  'zed-certification': {
    overview: 'Zero Defect Zero Effect (ZED) Certification is a government-supported certification programme for eligible manufacturing MSMEs. It encourages businesses to improve product quality, adopt better manufacturing practices, and reduce environmental impact through a structured assessment process.',
    features: [
      'Government-supported certification',
      'Designed for eligible manufacturing MSMEs',
      'Online assessment process',
      'Quality and sustainability certification',
      'Digital certification'
    ],
    eligibility: [
      'Eligible manufacturing MSMEs.',
      'Businesses meeting the prescribed ZED criteria.'
    ],
    clientDocuments: [
      'PAN Card',
      'Udyam Registration Certificate',
      'Business Details',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'ZED Certification Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Quality management systems (QMS) mapping', 'Environmental compliance (EMS) structuring', 'ZED bronze/silver/gold tier progression', 'Subsidy linkage facilitation'],
  },
  'fssai-licence': {
    overview: 'If your business is involved in manufacturing, processing, storing, transporting, distributing, or selling food, you may need an FSSAI Registration or Licence. This includes restaurants, cloud kitchens, home kitchens, food stalls, tea shops, bakeries, grocery stores, food manufacturers, caterers, and food delivery businesses. The type of registration depends on the nature and scale of the business.',
    features: [
      'Issued by the Food Safety and Standards Authority of India (FSSAI)',
      'Applicable to eligible food businesses',
      'Online registration and licence process',
      'Registration or licence based on business size',
      'Food business licence number'
    ],
    eligibility: [
      'Businesses dealing with food.',
      'Food manufacturers, traders, importers, transporters, retailers, distributors, restaurants, and other eligible food businesses.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Business Address Proof',
      'Passport-size Photograph',
      'Details of Food Business'
    ],
    agencyDocuments: [
      'FSSAI Registration/Licence Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Basic, State & Central license categorization', 'FoSCoS portal application management', 'Food safety inspection preparation', 'Annual statutory return & renewal retainers'],
  },
  'drug-licence': {
    overview: 'A Drug Licence is required for businesses involved in the manufacture, sale, stock, distribution, or import of medicines and certain pharmaceutical products. The type of licence depends on the nature of the business and the applicable legal requirements.',
    features: [
      'Applicable to eligible pharmaceutical businesses',
      'Different licence categories',
      'Issued by the competent authority',
      'Online application in applicable cases',
      'Helps comply with drug laws'
    ],
    eligibility: [
      'Eligible manufacturers',
      'Retail and wholesale medical stores',
      'Importers and distributors',
      'Other businesses covered under the applicable law'
    ],
    clientDocuments: [
      'PAN Card',
      'Business Registration Proof',
      'Business Address Proof',
      'Identity Proof',
      'Details of the Business'
    ],
    agencyDocuments: [
      'Drug Licence Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['State Drug Controller representation', 'Retail, wholesale & distribution licenses', 'Pharmacist compliance auditing', 'Annual drug license renewal tracking'],
  },
  'cosmetics-licence': {
    overview: 'A Cosmetics Licence is required for businesses involved in the manufacture of cosmetics in India. Businesses importing cosmetics into India must obtain the required approvals before selling them. The applicable approval depends on the nature of the business and the products involved.',
    features: [
      'Applicable to eligible cosmetic businesses',
      'Online application in applicable cases',
      'Issued by the competent authority',
      'Helps comply with cosmetic regulations',
      'Different approvals for manufacturing and import'
    ],
    eligibility: [
      'Cosmetic manufacturers',
      'Cosmetic importers',
      'Other businesses covered under the applicable law'
    ],
    clientDocuments: [
      'PAN Card',
      'Business Registration Proof',
      'Business Address Proof',
      'Identity Proof',
      'Product Details'
    ],
    agencyDocuments: [
      'Cosmetics Licence Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['CDSCO & State Drug Controller filing', 'GMP manufacturing facility compliance', 'Cosmetic formulation dossier auditing', 'Product label statutory compliance'],
  },
  'legal-metrology': {
    overview: 'Legal Metrology regulates weights, measuring instruments, and packaged goods to ensure fair trade and accurate measurements. Businesses dealing with weighing machines, measuring instruments, or specified packaged commodities may be required to obtain registration or a licence under the applicable law.',
    features: [
      'Applicable to eligible businesses',
      'Covers weights and measures',
      'Covers specified packaged goods',
      'Helps comply with Legal Metrology laws',
      'Online application in applicable cases'
    ],
    eligibility: [
      'Manufacturers',
      'Importers',
      'Packers',
      'Dealers',
      'Repairers',
      'Other eligible businesses'
    ],
    clientDocuments: [
      'PAN Card',
      'Business Registration Proof',
      'Business Address Proof',
      'Identity Proof',
      'Business Details'
    ],
    agencyDocuments: [
      'Legal Metrology Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Packer & importer statutory registration', 'Model approval application management', 'Product label statutory declaration review', 'Weights & measures inspection defense'],
  },
  'fire-noc': {
    overview: 'A Fire No Objection Certificate (Fire NOC) is issued after verifying that a building complies with the prescribed fire safety requirements. It is required for eligible commercial, industrial, institutional, and other buildings covered under the applicable fire safety laws.',
    features: [
      'Issued by the Fire Department',
      'Fire safety compliance',
      'Applicable to eligible buildings',
      'Inspection-based approval',
      'Online application in applicable areas'
    ],
    eligibility: [
      'Buildings covered under the applicable fire safety laws.',
      'Commercial and industrial premises requiring Fire NOC.'
    ],
    clientDocuments: [
      'Identity Proof',
      'Property Documents',
      'Building Plan',
      'Business Details'
    ],
    agencyDocuments: [
      'Fire NOC Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Comprehensive fire safety architecture check', 'State Fire Department application filing', 'Inspection & testing representation', 'Annual Fire NOC statutory renewal'],
  },
  'pollution-control': {
    overview: 'Certain businesses may require approval from the State Pollution Control Board (SPCB) before starting or operating their activities. Depending on the type of business, this may include Consent to Establish (CTE) and Consent to Operate (CTO) under the applicable environmental laws.',
    features: [
      'Issued by the State Pollution Control Board',
      'Applicable to eligible industries',
      'Consent to Establish (CTE)',
      'Consent to Operate (CTO)',
      'Helps comply with environmental laws'
    ],
    eligibility: [
      'Industries covered under the applicable environmental laws.',
      'Businesses requiring SPCB approval.'
    ],
    clientDocuments: [
      'PAN Card',
      'Business Registration Proof',
      'Site Plan',
      'Business Address Proof',
      'Manufacturing Process Details'
    ],
    agencyDocuments: [
      'SPCB Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['CTE & CTO statutory filings', 'Environmental engineering documentation', 'Effluent treatment plant (ETP) compliance', 'Annual environmental audit reports'],
  },
  'iec-registration': {
    overview: 'An Import Export Code (IEC) is a unique identification number issued by the Director General of Foreign Trade (DGFT). It is generally required for businesses that import goods into India or export goods or services from India.',
    features: [
      'Issued by DGFT',
      'Required for eligible importers and exporters',
      'Online registration process',
      'Permanent registration number',
      'Valid across India'
    ],
    eligibility: [
      'Proprietorships',
      'Partnership Firms',
      'LLPs',
      'Companies',
      'Other eligible business entities'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Business Address Proof',
      'Bank Account Details',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'IEC Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Instant DGFT portal allocation', 'Authorized Dealer (AD) code integration', 'Pan-India customs port mapping', 'Annual DGFT IEC statutory update'],
  },
  'dgft-authorizations': {
    overview: 'DGFT Authorizations are approvals issued by the Director General of Foreign Trade (DGFT) for businesses engaged in international trade. Depending on the business activity, different authorizations may be required under the Foreign Trade Policy.',
    features: [
      'Issued by DGFT',
      'Applicable to eligible importers and exporters',
      'Online application process',
      'Different authorizations for different business needs'
    ],
    eligibility: [
      'Businesses eligible under the Foreign Trade Policy.'
    ],
    clientDocuments: [
      'IEC',
      'Business Details',
      'Supporting Documents'
    ],
    agencyDocuments: [
      'DGFT Authorization Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Export incentive eligibility auditing', 'Advance Authorization & EPCG filings', 'Export obligation redemption (EODC)', 'DGFT dispute representation'],
  },
  'rcmc-registration': {
    overview: 'A Registration-cum-Membership Certificate (RCMC) is issued by the relevant Export Promotion Council or Commodity Board. It is required for certain exporters to avail benefits under the Foreign Trade Policy and other export promotion schemes.',
    features: [
      'Issued by Export Promotion Councils',
      'Applicable to eligible exporters',
      'Online application in applicable cases',
      'Required for specified export benefits'
    ],
    eligibility: [
      'Exporters covered under the applicable Foreign Trade Policy.'
    ],
    clientDocuments: [
      'IEC',
      'Business Registration Proof',
      'Business Details'
    ],
    agencyDocuments: [
      'RCMC Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Commodity-specific council identification', 'Export Promotion Council filing', 'Market access initiative eligibility', 'Annual RCMC membership renewal'],
  },
  'ad-code': {
    overview: 'An Authorised Dealer (AD) Code links your business bank account with Customs for export transactions. It is generally required for exporters to complete customs formalities and receive export proceeds through the designated bank.',
    features: [
      'Linked with the authorised bank',
      'Required for eligible exporters',
      'Used for customs processes',
      'Port-specific registration'
    ],
    eligibility: [
      'Businesses holding a valid IEC.',
      'Exporters carrying out customs clearance.'
    ],
    clientDocuments: [
      'IEC',
      'Bank Letter',
      'Business Details'
    ],
    agencyDocuments: [
      'AD Code Registration',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Bank AD code letter coordination', 'ICEGATE customs port registration', 'Multi-port EDI linking', 'Drawback account verification'],
  },
  'icegate-registration': {
    overview: 'ICEGATE is the online portal of Indian Customs for electronic filing and customs-related services. Businesses engaged in import or export can register on ICEGATE to access various customs services online.',
    features: [
      'Indian Customs online portal',
      'Electronic customs services',
      'Online registration',
      'Access to customs filings'
    ],
    eligibility: [
      'Businesses with a valid IEC.',
      'Eligible importers, exporters, and customs stakeholders.'
    ],
    clientDocuments: [
      'IEC',
      'Business Details',
      'Authorised Signatory Details'
    ],
    agencyDocuments: [
      'ICEGATE Registration',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Complete ICEGATE user registration', 'DSC authentication linking', 'Customs broker integration advisory', 'Real-time customs clearance tracking'],
  },
  'dsc-registration': {
    overview: 'A Digital Signature Certificate (DSC) is a secure digital signature used to sign electronic documents and forms. It is commonly required for filings with the Ministry of Corporate Affairs (MCA), Income Tax Department, GST portal, and other government authorities.',
    features: [
      'Secure digital signature',
      'Used for online government filings',
      'Legally valid electronic signature',
      'Issued by licensed Certifying Authorities'
    ],
    eligibility: [
      'Individuals',
      'Directors',
      'Partners',
      'Authorised Signatories',
      'Businesses'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Passport-size Photograph',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'DSC Application',
      'Identity Verification Support',
      'Application tracking and status updates'
    ],
    whyUs: ['Encrypted Class 3 DSC token issuance', '1-year and 2-year statutory validity', 'Aadhaar / PAN paperless verification', 'Express secure token delivery'],
  },
  'din-registration': {
    overview: 'A Director Identification Number (DIN) is a unique identification number allotted by the Ministry of Corporate Affairs (MCA) to an individual who wishes to become a director of a company. A valid DIN is mandatory before a person can be appointed as a director.',
    features: [
      'Unique identification number',
      'Issued by MCA',
      'Mandatory for company directors',
      'Lifetime validity'
    ],
    eligibility: [
      'Individuals eligible to be appointed as directors under the Companies Act.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Passport-size Photograph',
      'Address Proof',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'DIN Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['SPICe+ integrated DIN allotment', 'Standalone DIR-3 application filing', 'Deactivated DIN regularisation', 'DIR-3 KYC annual maintenance'],
  },
  'mca-kyc': {
    overview: 'DIR-3 KYC is the annual KYC process for individuals holding a Director Identification Number (DIN). Eligible directors are required to complete the KYC filing within the prescribed time to keep their DIN active.',
    features: [
      'Annual KYC filing',
      'Applicable to DIN holders',
      'Online filing process',
      'Helps keep DIN active'
    ],
    eligibility: [
      'Individuals holding a DIN who are required to complete DIR-3 KYC.'
    ],
    clientDocuments: [
      'PAN Card',
      'Aadhaar Card',
      'Mobile Number & Email ID'
    ],
    agencyDocuments: [
      'DIR-3 KYC Filing',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['On-time annual statutory submission', 'DSC and OTP authenticated filing', 'Multi-director corporate bulk execution', 'Deactivated DIN restoration retainers'],
  },
  'lei-registration': {
    overview: 'A Legal Entity Identifier (LEI) is a globally recognised 20-character identification code for legal entities participating in financial transactions. Certain entities are required to obtain an LEI as prescribed by the applicable regulatory requirements.',
    features: [
      'Global identification code',
      '20-character LEI',
      'Internationally recognised',
      'Applicable to eligible entities'
    ],
    eligibility: [
      'Legal entities covered under the applicable regulatory requirements.'
    ],
    clientDocuments: [
      'PAN Card',
      'Business Registration Proof',
      'Authorised Signatory Details'
    ],
    agencyDocuments: [
      'LEI Application',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['CCIL / Global LEI foundation filing', 'Corporate documentation preparation', 'Expedited LEI code allocation', 'Annual LEI statutory renewal tracking'],
  },
  'annual-compliance': {
    overview: 'Annual Compliance includes the statutory filings and compliances that businesses are required to complete every year under the applicable laws. The requirements vary depending on the type of business, such as a Company, LLP, or other registered entity.',
    features: [
      'Annual statutory compliance',
      'Periodic government filings',
      'Entity-specific compliance',
      'Helps maintain legal compliance'
    ],
    eligibility: [
      'Companies',
      'LLPs',
      'Other entities required to complete annual statutory filings'
    ],
    clientDocuments: [
      'Financial Statements',
      'Statutory Records',
      'Business Details',
      'Information required for annual filings'
    ],
    agencyDocuments: [
      'Annual Compliance Filings',
      'Government Filing',
      'Application tracking and status updates'
    ],
    whyUs: ['Dedicated Senior Advisory statutory audits', 'Automated MCA/ROC compliance calendars', 'Financial statement preparation & filing', 'Zero-penalty statutory guarantee'],
  }
};

/* â”€â”€â”€ FAQ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */



export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    const found = getServiceBySlug(slug);
    if (found) {
      setServiceData(found);
    } else {
      navigate('/services', { replace: true });
    }
  }, [slug, navigate]);

  if (!serviceData) return null;

  const content = serviceContent[slug] || {
    overview: serviceData.shortDesc || 'Comprehensive statutory representation and execution retainer.',
    whyUs: [
      'Senior Corporate Advisory & Legal supervision',
      'Secure digital documentation without physical visits',
      'Transparent Pricing',
      'Ongoing post-filing statutory compliance support'
    ]
  };

  const IconComponent = categoryIconMap[serviceData.categoryIcon] || CheckCircle2;

  const related = serviceCategories
    .find(c => c.title === serviceData.category)
    ?.services.filter(s => s.slug !== slug).slice(0, 4) || [];

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#F8F8F6' }}>

      {/* â”€â”€ HERO SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: '#F8F8F6', paddingTop: '2rem', paddingBottom: '3rem', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: '#9CA3AF', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 160ms' }}
              onMouseEnter={e => e.currentTarget.style.color = '#172033'}
              onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>Home</Link>
            <span style={{ color: '#D1D5DB' }}>/</span>
            <Link to="/services" style={{ color: '#9CA3AF', textDecoration: 'none', transition: 'color 160ms' }}
              onMouseEnter={e => e.currentTarget.style.color = '#172033'}
              onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>Services</Link>
            <span style={{ color: '#D1D5DB' }}>/</span>
            <span style={{ color: '#374151', fontWeight: 500 }}>{serviceData.title}</span>
          </div>

          {/* Two-column Hero */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: '2rem', alignItems: 'start' }}
            className="sd-hero-grid">

            {/* LEFT â€” Main Content */}
            <div>
              {/* Gold eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <IconComponent size={14} style={{ color: '#C79A45' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C79A45', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {serviceData.category || 'Statutory & Advisory'}
                </span>
              </div>

              {/* H1 */}
              <h1 style={{ fontFamily: 'var(--font-editorial), Georgia, serif', fontSize: 'clamp(1.875rem, 3vw, 2.75rem)', fontWeight: 600, color: '#0B172A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem', maxWidth: '28ch' }}>
                {serviceData.title}
              </h1>

              {/* Overview paragraph */}
              <p style={{ fontSize: '0.9375rem', color: '#475467', lineHeight: '1.7', maxWidth: '100%', fontFamily: 'var(--font-body)', fontWeight: 400, marginBottom: '1.5rem' }}>
                {content.overview}
              </p>

              {/* Key Features â€” clean column grid, no dark boxes */}
              {content.features && content.features.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B172A', marginBottom: '0.875rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
                    Key Features
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }} className="sd-features-grid">
                    {content.features.map((feature, idx) => (
                      <div key={idx} style={{
                        display: 'flex', flexDirection: 'column', gap: '0.4rem',
                        padding: '0.875rem 1rem',
                        borderRight: (idx + 1) % 3 !== 0 ? '1px solid #E5E7EB' : 'none',
                        borderBottom: '1px solid #E5E7EB',
                        borderTop: idx < 3 ? '1px solid #E5E7EB' : 'none',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FBF5E8', border: '1px solid rgba(199,154,69,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#C79A45', fontFamily: 'var(--font-mono)' }}>
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.875rem', color: '#172033', fontWeight: 600, lineHeight: 1.4 }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Eligibility + Documents â€” two clean columns */}
              {((content.eligibility && content.eligibility.length > 0) || (content.clientDocuments && content.clientDocuments.length > 0) || (serviceData.documents && serviceData.documents.length > 0)) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>

                  {/* Eligibility */}
                  {content.eligibility && content.eligibility.length > 0 && (
                    <div>
                      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B172A', marginBottom: '0.875rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
                        Eligibility Criteria
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {content.eligibility.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '0.5rem 0', borderBottom: idx < content.eligibility.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FBF5E8', border: '1px solid rgba(199,154,69,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                              <CheckCircle2 size={11} style={{ color: '#C79A45' }} />
                            </div>
                            <span style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.55 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents */}
                  {((content.clientDocuments && content.clientDocuments.length > 0) || (serviceData.documents && serviceData.documents.length > 0)) && (
                    <div>
                      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B172A', marginBottom: '0.875rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
                        Documents Required
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {(content.clientDocuments || serviceData.documents).map((doc, idx) => {
                          const docs = content.clientDocuments || serviceData.documents;
                          return (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.5rem 0', borderBottom: idx < docs.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                              <FileText size={14} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                              <span style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.55 }}>{doc.replace('*', '')}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* What Our Team Handles */}
              {content.agencyDocuments && content.agencyDocuments.length > 0 && (
                <div style={{ marginBottom: '1.5rem', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(16,24,40,0.04)' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B172A', marginBottom: '0.875rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} style={{ color: '#C79A45' }} />
                    Handled by Our Team
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.4rem' }}>
                    {content.agencyDocuments.map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.625rem 0.75rem', background: '#FAFAFA', borderRadius: '8px' }}>
                        <CheckCircle size={13} style={{ color: '#C79A45', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT â€” Service Snapshot Sidebar */}
            <div style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Snapshot Card */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '14px', boxShadow: '0 8px 30px rgba(16,24,40,0.06)', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0B172A', margin: 0, fontFamily: 'var(--font-heading)' }}>Service Snapshot</h3>
                </div>

                {serviceData.timeline && (
                  <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                      <Clock size={13} style={{ color: '#C79A45' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Estimated Turnaround</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#172033', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{serviceData.timeline}</p>
                  </div>
                )}

                {serviceData.fees && (
                  <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                      <CreditCard size={13} style={{ color: '#C79A45' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Government & Filing Fees</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#374151', margin: 0, lineHeight: 1.5 }}>{serviceData.fees}</p>
                  </div>
                )}

                <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  <Link to="/contact" style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                    padding: '0.8rem 1.25rem', width: '100%', textDecoration: 'none',
                    fontSize: '0.875rem', fontWeight: 700, borderRadius: '9px',
                    background: '#C79A45', color: '#0B172A',
                    boxShadow: '0 4px 14px rgba(199,154,69,0.35)',
                    transition: 'all 180ms ease'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#B48738'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(199,154,69,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#C79A45'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(199,154,69,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    Consult an Expert <ArrowRight size={15} />
                  </Link>
                  <a
                    href={`https://wa.me/918448803143?text=Hi%2C%20I'm%20inquiring%20about%20${encodeURIComponent(serviceData.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '0.75rem 1.25rem', width: '100%', textDecoration: 'none',
                      fontSize: '0.875rem', fontWeight: 600, borderRadius: '9px',
                      background: '#FFFFFF', border: '1px solid #D1D5DB',
                      color: '#374151', transition: 'all 160ms ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#9CA3AF'; e.currentTarget.style.background = '#F9FAFB'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.background = '#FFFFFF'; }}>
                    <MessageCircle size={15} /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Related Services Card */}
              {related.length > 0 && (
                <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '14px', boxShadow: '0 2px 8px rgba(16,24,40,0.04)', overflow: 'hidden' }}>
                  <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0B172A', margin: 0 }}>Related Services</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {related.map((s, idx) => (
                      <Link key={s.slug} to={`/services/${s.slug}`} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.7rem 1.25rem', textDecoration: 'none',
                        borderBottom: idx < related.length - 1 ? '1px solid #F3F4F6' : 'none',
                        transition: 'background 160ms ease',
                        color: 'inherit'
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                        <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>{s.title}</span>
                        <ChevronRight size={14} style={{ color: '#C79A45', flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ ENGAGEMENT PROCESS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: '#FBF5E8', padding: '3rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#0B172A', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', marginBottom: '0.75rem', textAlign: 'center', width: '100%', margin: '0 auto', display: 'block' }}>
              Our Engagement Process
            </h2>
            <p style={{ fontSize: '1rem', color: '#667085', maxWidth: '56ch', margin: '0 auto', lineHeight: '1.65' }}>
              A simple and hassle-free process from consultation to completion.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0', position: 'relative' }}>
            {[
              { num: '01', title: 'Consultation & Strategy', desc: 'We understand your business and assess eligibility.' },
              { num: '02', title: 'Document Preparation', desc: 'We guide you on required documents and prepare the application.' },
              { num: '03', title: 'Regulatory Filings', desc: 'We handle the government filing process on your behalf.' },
              { num: '04', title: 'Fast Delivery', desc: 'You receive the registration and regular status updates.' },
            ].map((step, idx, arr) => (
              <div key={idx} style={{
                padding: '1.5rem 1.25rem', position: 'relative',
                borderRight: idx < arr.length - 1 ? '1px solid rgba(199,154,69,0.2)' : 'none',
              }}>
                {/* Connector arrow */}
                {idx < arr.length - 1 && (
                  <div style={{ position: 'absolute', top: '2.25rem', right: '-10px', zIndex: 1, color: '#C79A45', fontSize: '1.25rem', lineHeight: 1 }}>
                    <ChevronRight size={18} style={{ color: 'rgba(199,154,69,0.6)' }} />
                  </div>
                )}
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#C79A45', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0B172A', fontFamily: 'var(--font-mono)' }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B172A', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#667085', lineHeight: '1.6', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* â”€â”€ BOTTOM CTA BANNER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: '#0B172A', padding: '3.5rem 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', textAlign: 'center', width: '100%', margin: '0 auto', display: 'block' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '44ch', margin: '0 auto 2.5rem' }}>
            Our team of qualified professionals is ready to help you with {serviceData.title} and all related compliance requirements.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.875rem 2rem', fontSize: '0.9rem', fontWeight: 700, borderRadius: '9px',
              background: '#C79A45', color: '#0B172A', textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(199,154,69,0.4)',
              transition: 'all 180ms ease'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#B48738'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C79A45'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              Talk to an Expert <ArrowRight size={16} />
            </Link>
            <a href={`https://wa.me/918448803143?text=Hi%2C%20I'm%20inquiring%20about%20${encodeURIComponent(serviceData.title)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '0.875rem 2rem', fontSize: '0.9rem', fontWeight: 600, borderRadius: '9px',
                background: 'transparent', border: '1px solid rgba(255,255,255,0.25)',
                color: '#FFFFFF', textDecoration: 'none',
                transition: 'all 160ms ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent'; }}>
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Responsive hero grid override */}
      <style>{`
        @media (max-width: 1023px) {
          .sd-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .sd-features-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .sd-hero-grid {
            padding: 0 16px;
          }
        }
      `}</style>

    </div>
  );
}
