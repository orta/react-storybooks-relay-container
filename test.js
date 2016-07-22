const relayContainer = require("./")
const expect = require("expect.js")

it("makes a module", () => {
  expect(typeof relayContainer.default).to.equal("function")
})
