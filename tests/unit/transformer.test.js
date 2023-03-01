const { expect } = require("chai");
const sinon = require("sinon");
const db = require("../../src/db");
const { create } = require("../../src/controllers/transformer");

describe("create", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("returns a 201 status code", async () => {
    // arrange
    const request = {
      body: { name: "name", allegiance: "allegiance", alt_mode: "alt_mode" },
    };
    const response = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.spy();
    const data = {
      rows: [
        {
          id: 1,
          ...request.body,
        },
      ],
    };
    sinon.stub(db, "query").returns(Promise.resolve(data));

    // act
    await create(request, response);

    // assert
    expect(response.status.calledWith(201)).to.be.true;
    expect(
      response.json.calledWith({
        id: 1,
        name: "name",
        allegiance: "allegiance",
        alt_mode: "alt_mode",
      })
    ).to.be.true;
  });

  it("passes the correct SQL to the db", async () => {
    // arrange
    const request = {
      body: { name: "name", allegiance: "allegiance", alt_mode: "alt_mode" },
    };
    const response = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.spy();
    const data = {
      rows: [
        {
          id: 1,
          ...request.body,
        },
      ],
    };
    const mockDB = sinon
      .mock(db)
      .expects("query")
      .once()
      .withArgs(
        "INSERT INTO Transformers(name, allegiance, alt_mode) VALUES ($1, $2, $3) RETURNING *",
        ["name", "allegiance", "alt_mode"]
      )
      .returns(Promise.resolve(data));

    // act
    await create(request, response);

    // assert
    mockDB.verify();
  });
});
