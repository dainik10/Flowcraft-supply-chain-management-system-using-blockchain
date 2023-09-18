import smartpy as sp

class SupplyChain(sp.Contract):
    def __init__(self):
        self.init(product = sp.map(
        tkey = sp.TNat,
        tvalue=sp.TRecord(
        productName = sp.TString,
        description = sp.TString)),
        productStatus = sp.map(
        tkey = sp.TNat,
        tvalue = sp.TList(t=sp.TRecord(
        statusDescription = sp.TString,
        longitude = sp.TString,
        latitude = sp.TString,
        time = sp.TString
        ))))
    
    @sp.entry_point
    def add_product(self, productID, productName, description):
        self.data.product[productID] = sp.record(description= description,       productName = productName)                                            
    
    @sp.entry_point
    def update_status(self, productID, statusDescription, longitude, latitude, time):
        sp.if(self.data.productStatus.contains(productID)==False):
            self.data.productStatus[productID] = sp.list()
        self.data.productStatus[productID].push(sp.record(statusDescription = statusDescription, longitude = longitude, latitude = latitude, time = time))

if "templates" not in __name__:
    @sp.add_test(name = "StoreValue")
    def test():
        bob = sp.test_account("bob")
        alice = sp.test_account("alice")
        c1 = SupplyChain()
        scenario = sp.test_scenario()
        scenario.h1("Add Project")
        scenario += c1
        c1.add_product(productID=1, productName="MAango", description="Food Item")
        c1.update_status(productID=1, statusDescription="Product Created", longitude="29.292929348", latitude="30.2039439823", time = "15 Sep")
        c1.update_status(productID=1, statusDescription="Sent to Supplier", longitude="93.293498394", latitude="92.394839843", time = "16 Sep")
    sp.add_compilation_target("SupplyChain", SupplyChain())