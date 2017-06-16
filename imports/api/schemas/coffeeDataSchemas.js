// Type definition
// text: text value input by hand
// option: selection value given by other schemas

export const FieldsArea = [

  {
    name: "Name",
    value: "nameEN",
    type: "text"
  },
  {
    name: "名稱",
    value: "nameTC",
    type: "text"
  },
  {
    name: "Active",
    value: "isActive",
    type: "boolean"
  },
];


export const FieldsProcess = [
  {
    name: "Name",
    value: "nameEN",
    type: "text"
  },
  {
    name: "名稱",
    value: "nameTC",
    type: "text"
  },
  {
    name: "Active",
    value: "isActive",
    type: "boolean"
  },
  {
    name: "Description",
    value: "description",
    type: "text"

  },
];

export const FieldsCultivar = [
  {
    name: "Name",
    value: "nameEN",
    type: "text"

  },
  {
    name: "名稱",
    value: "nameTC",
    type: "text"

  },
  {
    name: "Active",
    value: "isActive",
    type: "boolean"
  },
  {
    name: "Description",
    value: "description",
    type: "text"

  },

];

export const FieldsCountry = [
  {
    name: "Name",
    value: "nameEN",
    type: "text"
  },
  {
    name: "名稱",
    value: "nameTC",
    type: "text"
  },
  {
    name: "Area",
    value: "area",
    type: "option",
    source: "FieldsArea"
  },
  {
    name: "Active",
    value: "isActive",
    type: "boolean"
  },
];

export const FieldsRegion = [
  {
    name: "Name",
    value: "nameEN",
    type: "text"
  },
  {
    name: "名稱",
    value: "nameTC",
    type: "text"
  },
  {
    name: "Area",
    value: "area",
    type: "option",
    source: "FieldsArea"
  },
  {
    name: "Country",
    value: "country",
    type: "option",
    source: "FieldsCountry"
  },
  {
    name: "Active",
    value: "isActive",
    type: "boolean"
  },
];
