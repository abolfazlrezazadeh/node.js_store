module.exports = {
  roles: {
    regexForMongoDbID : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i ,
    user: "user",
    admin: "admin",
    writer: "writer",
    teacher: "teacher",
    spiller: "spiller",
  },
  ACCESS_TOKEN_SECRET_KEY:
    "44FB968305ED8F092092CBBD255F8BA232634E1637A1188BF020684C948AFAA1",
  REFRESH_TOKEN_SECRET_KEY:
    "7B41D3EB60756DBAD9DCC21CF0660AF2485D54CA6B70EBF0524EFA03E3276178",
};
