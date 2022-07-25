const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", () => {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), 0)
    })

    it("Should start with store", async () => {
        const transactionResponse = await simpleStorage.store(7)
        await transactionResponse.wait(1)
        const updatedValue = await simpleStorage.retrieve()
        assert.equal(updatedValue.toString(), 7)
    })

    it("Should start with addPeople", async () => {
        const people = {
            name: "Join",
            favoriteNumber: 100,
        }
        const transactionResponse = await simpleStorage.addPerson(people.name, people.favoriteNumber)
        await transactionResponse.wait(1)
        const peopleFavoriteNumber = await simpleStorage.getPersonByName(people.name)
        assert.equal(peopleFavoriteNumber, people.favoriteNumber)
    })
})
