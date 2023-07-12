module.exports = {
  roles: Object.freeze({
    regexForMongoDbID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    user: "USER",
    admin: "admin",
    writer: "writer",
    teacher: "teacher",
    supplier: "spiller",
  }),
  PERMISSIONS: Object.freeze({
    USER: ["PROFILE"],
    ADMIN: ["ALL"],
    SUPERADMIN: ["ALL"],
    CONTENT_MANAGER: ["COURSE", "BLOG", "CATEGORY" , "PRODUCT"],
    TEACHER: ["COURSE" , "BLOG"],
    SUPPLIER: ["PRODUCT"],
    ALL: "ALL",
  }),
  ACCESS_TOKEN_SECRET_KEY:
    "44FB968305ED8F092092CBBD255F8BA232634E1637A1188BF020684C948AFAA1",
  REFRESH_TOKEN_SECRET_KEY:
    "7B41D3EB60756DBAD9DCC21CF0660AF2485D54CA6B70EBF0524EFA03E3276178",
};
