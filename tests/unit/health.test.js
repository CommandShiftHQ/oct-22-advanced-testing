const { expect } = require("chai");
const sinon = require("sinon");
const { checkStatus } = require("../../src/controllers/health");

it("return a 200 status code", () => {
  const req = {};
  const res = { sendStatus: sinon.spy() };

  checkStatus(req, res);

  expect(res.sendStatus.calledOnce).to.be.true;
  expect(res.sendStatus.calledWith(200)).to.be.true;
});
