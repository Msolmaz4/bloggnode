module.exports = {
    isLogin: (req, res, next) => {
      
  
      if (req.user) {
        next();
      } else {
   
        throw new Error("NoPermission: You must login.");
      }
    },
  
    isAdmin: (req, res, next) => {
     
   //console.log("isadmin ")
      if (req.user && req.user.isAdmin) {
        next();
      } else {
      
        throw new Error("NoPermission: You must login and to be Admin.");
      }
    },
  
    isStaffOrisAdmin: (req, res, next) => {
     
  
      if (req.user && (req.user.isAdmin || req.user.isStaff)) {
        next();
      } else {
      
        throw new Error("NoPermission: You must login and to be Staff or Admin.");
      }
    },
  };