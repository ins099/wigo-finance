export const PROFILE_FIELDS = [
  {
    id: "1",
    title: "Account Details",
    fields: [
      {
        id: "1",
        label: "Account Name",
        placeholder: "Enter Account Name",
        type: "text",
        name: "account_name",
      },
      {
        id: "2",
        label: "Account Number",
        placeholder: "Enter Account Number",
        type: "number",
        keyboardType: "number-pad",
        name: "account_number",
      },
      {
        id: "3",
        label: "Routing Number",
        placeholder: "Enter Routing Number",
        keyboardType: "number-pad",
        type: "number",
        name: "routing_number",
      },
      {
        id: "4",
        label: "Swift",
        placeholder: "Enter Swift",
        type: "text",
        name: "swift",
      },
      {
        id: "5",
        label: "Bank Name",
        placeholder: "Enter Bank Name",
        type: "text",
        name: "bank_name",
      },
    ],
  },
  {
    id: "2",
    title: "Personal Info",
    fields: [
      { id: "1", label: "Full Name", type: "text", name: "fullname" },
      { id: "2", label: "Date of Birth", type: "datetime", name: "dob" },
      { id: "3", label: "Email ID", type: "datetime", name: "dob" },
      {
        id: "4",
        label: "Mobile Country Code",
        type: "phone_code_picker",
        name: "country_code",
      },
      {
        id: "5",
        label: "Mobile Number",
        type: "phone",
        keyboardType: "number-pad",
        maxLength:15,
        name: "mobile_number",
      },
    ],
  },
  {
    id: "3",
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
