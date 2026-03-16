export default(myErrorFun) => (req, res, next) => {
  Promise.resolve(myErrorFun(req, res, next)).catch(next);
}

//.CATCH(NEXT) if controller code fails this line catches the error and triggers err