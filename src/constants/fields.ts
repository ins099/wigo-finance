
export const PROFILE_FIELDS = [
  {
    id: "account_detail",
    title: "Account Details",
    fields: [
      {
        id: "1",
        label: "Account Name",
        placeholder: "Enter Account Name",
        type: "text",
        name: "AccountHolderName",
      },
      {
        id: "2",
        label: "Account Number",
        placeholder: "Enter Account Number",
        type: "number",
        keyboardType: "number-pad",
        name: "AccountNumber",
      },
      {
        id: "3",
        label: "Routing Number",
        placeholder: "Enter Routing Number",
        keyboardType: "number-pad",
        type: "number",
        name: "RouterNumber",
      },
      {
        id: "4",
        label: "Swift",
        placeholder: "Enter Swift",
        type: "text",
        name: "Swift",
      },
      {
        id: "5",
        label: "Bank Name",
        placeholder: "Enter Bank Name",
        type: "text",
        name: "BankName",
      },
    ],
  },
  {
    id: "personal_detail",
    title: "Personal Info",
    fields: [
      { id: "1", label: "Full Name", type: "text", name: "name", placeholder:'Enter full name' },
      {
        id: "2",
        label: "Date of Birth",
        type: "date",
        name: "dob",
        placeholder: "Select your DOB",
      },
      {
        id: "3",
        label: "Email ID",
        type: "text",
        name: "userName",
        placeholder: "Enter your email ID",
        keyboardType: "email-address",
      },
      // {
      //   id: "4",
      //   label: "Mobile Country Code",
      //   type: "phone_code_picker",
      //   name: "country_code",
      // },
      {
        id: "5",
        label: "Mobile Number",
        type: "phone",
        keyboardType: "number-pad",
        maxLength: 15,
        name: "phone",
      },
    ],
  },
  {
    id: "address_detail",
    title: "Address Detail",
    fields: [
      { id: "1", label: "Country", type: "dropdown", name: "country" },
      { id: "2", label: "City", type: "dropdown", name: "city" },
      { id: "3", label: "State", type: "dropdown", name: "state" },
      { id: "4", label: "Post Code", type: "text", name: "state" },
      {
        id: "5",
        label: "Street and Number",
        type: "text",
        name: "street_n-Number",
      },
    ],
  },
];
