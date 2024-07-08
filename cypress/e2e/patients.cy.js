import methods from "../methods/customMethods.js"

describe('Patients', () => {
  it("POST add new patient with valid data", () => {
    const address=methods.randomAddress();
    const name=methods.randomName();
    const phoneNumber=methods.randomPhoneNumber();
    cy.request({
      method: 'POST',
      url:'http://localhost:8888/patients',
      body: {
        name: name,
        address: address,
        phoneNumber: phoneNumber
      }
    }).then((response) =>{
      cy.log("Response is : " + JSON.stringify(response))
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq(name)
      expect(response.body.address).to.eq(address)
      expect(response.body.id).not.null
      expect(response.body.phoneNumber).to.eq(phoneNumber)
    })
  })
  it("POST add new patient with invalid data", () => {
    cy.request({
      method: 'POST',
      url:'http://localhost:8888/patients',
      failOnStatusCode: false,
      body: {
        id:true,
        name: false,
        address: "Main Street",
        phoneNumber: "56-456-7890"
      }
    }).then((response) =>{
      cy.log("Response is : " + JSON.stringify(response))
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq("Bad Request")
      expect(response.body.path).to.eq("/patients")
    })
  })
  it("GET retrieve data given by id", () => {
    cy.request({
      method: 'GET',
      url:'http://localhost:8888/patients/1'
  
    }).then((response) =>{
      cy.log("Response is : " + JSON.stringify(response))
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('John Doe')
      expect(response.body.id).to.eq(1)
      expect(response.body.address).to.eq('123 Main St')
      expect(response.body.phoneNumber).to.eq('123-456-7890')
    })
  })
  it("GET retrieve data given by non-exists id", () => {
    cy.request({
      method: 'GET',
      url:'http://localhost:8888/patients/100'

    }).then((response) =>{
      cy.log("Response is : " + JSON.stringify(response))
      expect(response.status).to.eq(200)
    })
  })
  it("DELETE exists patient data", () => {
    cy.request({
      method: 'DELETE',
      url:'http://localhost:8888/patients/5',
      failOnStatusCode: false
    }).then((response) =>{
      cy.log("Response is : " + JSON.stringify(response))
      expect(response.status).to.eq(200)
    })
  })
  it("DELETE non-exists patient data", () => {
    cy.request({
      method: 'DELETE',
      url:'http://localhost:8888/patients/2500',
      failOnStatusCode: false
    }).then((response) =>{
      cy.log("Response is : " + JSON.stringify(response))
      expect(response.status).to.eq(200)
    })
  })
  it("UPDATE non-exists patient data", () => {
    cy.request({
      method: 'DELETE',
      url:'http://localhost:8888/patients/2500',
      failOnStatusCode: false
    }).then((response) =>{
      cy.log("Response is : " + JSON.stringify(response))
      expect(response.status).to.eq(200)
    })
  })
  it("UPDATE exists patient data", () => {
    cy.request({
      method: 'PUT', url:'http://localhost:8888/patients',
      body: {
        name: "Updated Name",
       address: "Updated Address",
       phoneNumber: "987-654-3210"
     },
      failOnStatusCode: false
    }).then((response) =>{
      cy.log("Response is : " + JSON.stringify(response))
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name', 'Updated Name');
      expect(response.body).to.have.property('address', 'Updated Address');
      expect(response.body).to.have.property('phoneNumber', '987-654-3210');
    })
  })
    it('GET List all patients', () => {
      cy.request('http://localhost:8888/patients').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        if (response.body.length > 0) {
          response.body.forEach(patient => {
            expect(patient).to.have.property('id').that.is.a('number');
            expect(patient).to.have.property('name').that.is.a('string');
            expect(patient).to.have.property('address').that.is.a('string');
            expect(patient).to.have.property('phoneNumber').that.is.a('string');
          });
        }
      });
  })
})