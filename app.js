/* 
Citation for the express setup, routes, and listeners:
Date: 10/31/2023
Copied from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
*/

// Express
var express = require("express");
var app = express();
PORT = 7524;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

// Database
var db = require("./database/db-connector");

/* 
Citation for the handlebar setup:
Date: 11/13/2023
Copied from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

var hbs = exphbs.create({})

// The handlebars helper was created by us using the official handlebars documentation 
hbs.handlebars.registerHelper('formatDate', function (date) {
  return new Intl.DateTimeFormat('en-US').format(date);
})

hbs.handlebars.registerHelper('formatDateTime', function (date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date);
})

/* 
Citation for all of the following routes:
Date: 11/15/2023
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

app.get("/", function (req, res) {
  res.render("index", {
    helpers: {
      title: "Footwear Distro Home Page",
      h1: "<h1>Home Page of Footwear Distro</h1>",
    },
  });
});


// DistributionCenters Routes
app.get("/DistributionCenters", function (req, res) {
  let selectQuery = 
                  `
                    SELECT distributionCenterID, address, email, phoneNumber 
                    FROM DistributionCenters;
                  `;
  db.pool.query(selectQuery, function (error, rows, fields) {
    res.render("DistributionCenters", {
      helpers: {
        title: "Footwear Distro: Distribution Centers Page",
        h1: "<h1>Footwear Distro: Distribution Centers Page</h1>",
      },
      data: rows,
    });
  });
});

app.post("/addDistributionCenters", function (req, res) {
  let data = req.body;

  let insertQuery = 
                    `
                      INSERT INTO DistributionCenters(address, email, phoneNumber) 
                      VALUES ("${data["input-address"]}", "${data["input-email"]}", "${data["input-phoneNumber"]}")
                    `;
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/DistributionCenters");
    }
  });
});

app.delete("/deleteDistributionCenters", function (req, res) {
  let data = req.body;
  let distributionCenterID = parseInt(data.distributionCenterID);
  let deleteQuery = `DELETE FROM DistributionCenters WHERE distributionCenterID = ?`;

  db.pool.query(
    deleteQuery,
    [distributionCenterID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.put("/updateDistributionCenters", function (req, res) {
  let data = req.body;

  let distributionCenterID = parseInt(data.distributionCenterID);
  let phoneNumber = data.phoneNumber;
  let email = data.email;
  let address = data.address;

  let updateQuery = 
                `
                  UPDATE DistributionCenters 
                  SET phoneNumber = ?, email = ?, address = ? 
                  WHERE distributionCenterID = ?
                `;

  db.pool.query(
    updateQuery,
    [phoneNumber, email, address, distributionCenterID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});


// Inventories Routes
app.get("/Inventories", function (req, res) {
  let selectQuery = 
                  `
                    SELECT inventoryID, 
                    (
                      SELECT address 
                      FROM DistributionCenters 
                      WHERE DistributionCenters.distributionCenterID = Inventories.distributionCenterID
                    ) as address, 
                    (
                      SELECT barcode 
                      FROM Products 
                      where Products.productID = Inventories.productID
                    ) as barcode, quantity 
                    FROM Inventories;
                  `;
  let selectQuery1 = `SELECT distributionCenterID, address FROM DistributionCenters;`;
  let selectQuery2 = `SELECT productID, barcode FROM Products;`;
  db.pool.query(selectQuery, function(error, rows, fields) {
    let inventories = rows;
    db.pool.query(selectQuery1, function(error, rows, fields) {
      let distributionCenters = rows;
      db.pool.query(selectQuery2, function(error, rows, fields) {
        let products = rows;
        res.render("Inventories", {
          helpers: {
            title: "Footwear Distro: Inventories Page",
            h1: "<h1>Footwear Distro: Inventories Page</h1>",
          },
          data: inventories,
          distributionCenters: distributionCenters,
          products: products
        });
      })
    })
  })
});

app.post("/addInventories", function (req, res) {
  let data = req.body;
  
  let insertQuery = 
                `
                  INSERT INTO Inventories(distributionCenterID, productID, quantity) 
                  VALUES 
                  (
                    (
                      SELECT distributionCenterID 
                      FROM DistributionCenters 
                      WHERE DistributionCenters.address = "${data["input-address"]}"
                    ), 
                    (
                      SELECT productID 
                      FROM Products 
                      where Products.barcode = "${data["input-barcode"]}"
                    ), '${data["input-quantity"]}'
                  )
                `;
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/Inventories");
    }
  });
});

app.delete("/deleteInventories", function (req, res) {
  let data = req.body;
  let inventoryID = parseInt(data.inventoryID);
  let deleteQuery = `DELETE FROM Inventories WHERE inventoryID = ?`;

  db.pool.query(
    deleteQuery,
    [inventoryID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.put("/updateInventories", function (req, res) {
  let data = req.body;

  let inventoryID = parseInt(data.inventoryID);
  let address = data.address;
  let barcode = data.barcode;
  let quantity = data.quantity;

  let updateQuery = 
                `
                  UPDATE Inventories 
                  SET distributionCenterID = 
                    (
                      SELECT distributionCenterID 
                      FROM DistributionCenters 
                      WHERE DistributionCenters.address = ?
                    ), 
                  productID = 
                    (
                      SELECT productID 
                      FROM Products 
                      WHERE Products.barcode = ?
                    ), 
                  quantity = ? 
                  WHERE inventoryID = ?
                `;

  db.pool.query(
    updateQuery,
    [address, barcode, quantity, inventoryID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Products Routes
app.get("/Products", function (req, res) {
  let selectQuery =                 
                  `
                    SELECT productID, 
                    (
                      SELECT modelName 
                      FROM Models 
                      WHERE Products.modelID = Models.modelID
                    ) as modelName, 
                    (
                      SELECT color 
                      FROM Colors 
                      where Products.colorID = Colors.colorID
                    ) as color, barcode, size 
                    FROM Products
                  `;
  
  let colorQuery;
  if (req.query.searchcolor === "") {
    colorQuery = ""
  }
  else if (req.query.searchcolor === "NULL") {
    colorQuery = `Products.colorID is NULL`;
  }
  else {
    colorQuery =                 
                ` 
                  (
                    SELECT color 
                    FROM Colors 
                    where Products.colorID = Colors.colorID
                  ) like "${req.query.searchcolor}";
                `;
  }

  let modelQuery;
  if (req.query.searchModelName === "") {
    modelQuery = ""
  }
  else if (req.query.searchModelName === "NULL") {
    modelQuery = `Products.modelID is NULL`;
  }
  else {
    modelQuery =                 
                ` 
                  (
                    SELECT modelName 
                    FROM Models 
                    WHERE Products.modelID = Models.modelID
                  ) like "${req.query.searchModelName}";
                `;
  }

  if (req.query.searchModelName === "" && req.query.searchcolor === "") {
    selectQuery += `;`
  } 
  else if (req.query.searchModelName === ""){
    selectQuery += 
                `WHERE ` + colorQuery + `;`;
  }
  else if (req.query.searchcolor === ""){
    selectQuery += 
                `WHERE ` + modelQuery + `;`;
  }
  else if (Object.keys(req.query).length == 2) {
    selectQuery += 
                `WHERE ` + modelQuery + ` and ` + colorQuery + `;`;
  }

  let selectQuery1 = `SELECT modelID, modelName FROM Models;`;
  let selectQuery2 = `SELECT colorID, color FROM Colors;`;

  db.pool.query(selectQuery, function(error, rows, fields) {
    let products = rows;
    db.pool.query(selectQuery1, function(error, rows, fields) {
      let models = rows;
      db.pool.query(selectQuery2, function(error, rows, fields) {
        let colors = rows;
        res.render("Products", {
          helpers: {
            title: "Footwear Distro: Products Page",
            h1: "<h1>Footwear Distro: Products Page</h1>",
          },
          data: products,
          models: models,
          colors: colors
        });
      })
    })
  })
});

app.post("/addProducts", function (req, res) {
  let data = req.body;

  let modelName = data.modelName;
  let color = data.color;
  let barcode = parseInt(data.barcode);
  let size = data.size;
  let insertQuery = 
                  `
                    INSERT INTO Products (modelID, colorID, barcode, size) 
                    VALUES (
                      (
                        SELECT modelID 
                        FROM Models 
                        WHERE Models.modelName = ?
                      ), 
                      (
                        SELECT colorID 
                        FROM Colors 
                        where Colors.color = ?
                      ), ?, ?
                    )
                  `;

  db.pool.query(insertQuery,[modelName, color, barcode, size], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/Products");
    }
  });
});

app.delete("/deleteProducts", function (req, res) {
  let data = req.body;
  let productID = parseInt(data.productID);
  let deleteQuery = `DELETE FROM Products WHERE productID = ?`;

  db.pool.query(
    deleteQuery,
    [productID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.put("/updateProducts", function (req, res) {
  let data = req.body;

  let productID = parseInt(data.productID);
  let modelName = data.modelName;
  let color = data.color;
  let barcode = data.barcode;
  let size = data.size;

  let updateQuery = 
                  `
                    UPDATE Products 
                    SET modelID = 
                    (
                      SELECT modelID 
                      FROM Models 
                      WHERE Models.modelName = ?
                    ), 
                    colorID = 
                    (
                      SELECT colorID 
                      FROM Colors 
                      WHERE Colors.color = ?
                    ), barcode = ?, size = ? 
                    WHERE productID = ?
                  `;

  db.pool.query(
    updateQuery,
    [modelName, color, barcode, size, productID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Models Routes
app.get("/Models", function (req, res) {
  let selectQuery = "SELECT modelID, modelName FROM Models;";
  db.pool.query(selectQuery, function (error, rows, fields) {
    res.render("Models", {
      helpers: {
        title: "Footwear Distro: Models Page",
        h1: "<h1>Footwear Distro: Models Page</h1>",
      },
      data: rows,
    })
  })
});

app.post("/addModels", function (req, res) {
  let data = req.body;

  let insertQuery = `INSERT INTO Models(modelName) VALUES ('${data["input-modelName"]}')`;
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/Models");
    }
  });
});

app.delete("/deleteModels", function (req, res) {
  let data = req.body;
  let modelID = parseInt(data.modelID);
  let deleteQuery = `DELETE FROM Models WHERE modelID = ?`;

  db.pool.query(
    deleteQuery,
    [modelID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.put("/updateModels", function (req, res) {
  let data = req.body;

  let modelID = parseInt(data.modelID);
  let modelName = data.modelName;

  let updateQuery = `UPDATE Models SET modelName = ? WHERE modelID = ?`;

  db.pool.query(
    updateQuery,
    [modelName, modelID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Colors Routes
app.get("/Colors", function (req, res) {
  let selectQuery = "SELECT colorID, color FROM Colors;";
  db.pool.query(selectQuery, function(error, rows, fields) {
    res.render("Colors", {
      helpers: {
        title: "Footwear Distro: Colors Page",
        h1: "<h1>Footwear Distro: Colors Page</h1>",
      },
      data: rows
    });
  })
});

app.post("/addColors", function (req, res) {
  let data = req.body;

  let insertQuery = `INSERT INTO Colors(color) VALUES ('${data["input-colorName"]}')`;
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/Colors");
    }
  });
});

app.delete("/deleteColors", function (req, res) {
  let data = req.body;
  let colorID = parseInt(data.colorID);
  let deleteQuery = `DELETE FROM Colors WHERE colorID = ?`;

  db.pool.query(
    deleteQuery,
    [colorID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.put("/updateColors", function (req, res) {
  let data = req.body;

  let colorID = parseInt(data.colorID);
  let color = data.colorName;

  let updateQuery = `UPDATE Colors SET color = ? WHERE colorID = ?`;

  db.pool.query(
    updateQuery,
    [color, colorID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// TransferredProducts Routes
app.get("/TransferredProducts", function (req, res) {
  let selectQuery = 
                  `
                    SELECT transferredProductID, 
                    (
                      SELECT barcode 
                      FROM Products 
                      WHERE Products.productID = TransferredProducts.productID
                    ) as barcode, transferReportID, quantity 
                    FROM TransferredProducts;
                  `;
  let selectQuery1 = "SELECT productID, barcode FROM Products;";
  let selectQuery2 = "SELECT transferReportID FROM TransferReports;"
  db.pool.query(selectQuery, function(error, rows, fields) {
    let transferredProducts = rows;
    db.pool.query(selectQuery1, function(error, rows, fields) {
      let products = rows;
      db.pool.query(selectQuery2, function(error, rows, fields){
        let transferReport = rows;
        res.render("TransferredProducts", {
          helpers: {
            title: "Footwear Distro: TransferredProducts Page",
            h1: "<h1>Footwear Distro: TransferredProducts Page</h1>",
          },
          data: transferredProducts,
          products: products,
          transferReport: transferReport
        });
      })
    })
  })
});

app.post("/addTransferredProducts", function (req, res) {
  let data = req.body;
  
  let insertQuery = 
                  `
                    INSERT INTO TransferredProducts(productID, transferReportID, quantity) 
                    VALUES 
                    (
                      (
                        SELECT productID 
                        FROM Products 
                        WHERE Products.barcode = "${data["input-barcode"]}"
                      ), '${data["input-transferReportID"]}', '${data["input-quantity"]}'
                    )
                  `;
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/TransferredProducts");
    }
  });
});

app.delete("/deleteTransferredProducts", function (req, res) {
  let data = req.body;
  let transferredProductID = parseInt(data.transferredProductID);
  let deleteQuery = `DELETE FROM TransferredProducts WHERE transferredProductID = ?`;

  db.pool.query(
    deleteQuery,
    [transferredProductID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.put("/updateTransferredProducts", function (req, res) {
  let data = req.body;

  let transferredProductID = parseInt(data.transferredProductID);
  let barcode = data.barcode;
  let transferReportID = parseInt(data.transferReportID);
  let quantity = data.quantity;

  let updateQuery = 
                  `
                    UPDATE TransferredProducts 
                    SET productID = 
                      (
                        SELECT productID 
                        FROM Products 
                        WHERE Products.barcode = ?
                      ), transferReportID = ?, quantity = ? 
                    WHERE transferredProductID = ?
                  `;

  db.pool.query(
    updateQuery,
    [barcode, transferReportID, quantity, transferredProductID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// TransferredReports Routes
app.get("/TransferReports", function (req, res) {
  let selectQuery = 
                  `
                    SELECT transferReportID, 
                    (
                      SELECT address 
                      FROM DistributionCenters 
                      WHERE DistributionCenters.distributionCenterID = TransferReports.distributionCenterID
                    ) as address, 
                    (
                      SELECT storeName 
                      FROM Stores 
                      WHERE TransferReports.storeID = Stores.storeID
                    ) as storeName, dateCreated, deliveryDateTime, expedited 
                    FROM TransferReports;
                  `;
  let selectQuery1 = "SELECT distributionCenterID, address FROM DistributionCenters;";
  let selectQuery2 = "SELECT storeID, storeName FROM Stores;"
  db.pool.query(selectQuery, function(error, rows, fields) {
    let TransferReports = rows;
    db.pool.query(selectQuery1, function(error, rows, fields) {
      let DistributionCenters = rows;
      db.pool.query(selectQuery2, function(error, rows, fields){
        let Stores = rows;
        res.render("TransferReports", {
          helpers: {
            title: "Footwear Distro: TransferReports Page",
            h1: "<h1>Footwear Distro: TransferReports Page</h1>",
          },
          data: TransferReports,
          DistributionCenters: DistributionCenters,
          Stores: Stores
        });
      })
    })
  })
});

app.post("/addTransferReports", function (req, res) {
  let data = req.body;

  let insertQuery = 
                  `
                    INSERT INTO TransferReports(distributionCenterID, storeID, dateCreated, deliveryDateTime, expedited) 
                    VALUES 
                    (
                      (
                        SELECT distributionCenterID 
                        FROM DistributionCenters 
                        WHERE DistributionCenters.address = "${data["input-address"]}"
                      ), 
                      (
                        SELECT storeID 
                        FROM Stores 
                        WHERE Stores.storeName = "${data["input-storeName"]}"
                      ), '${data["input-dateCreated"]}', '${data["input-deliveryDateTime"]}', '${data["input-expedited"]}'
                    )
                  `;
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/TransferReports");
    }
  });
});

app.delete("/deleteTransferReports", function (req, res) {
  let data = req.body;
  let transferReportID = parseInt(data.transferReportID);
  let deleteQuery = `DELETE FROM TransferReports WHERE transferReportID = ?`;

  db.pool.query(
    deleteQuery,
    [transferReportID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.put("/updateTransferReports", function (req, res) {
  let data = req.body;

  let transferReportID = parseInt(data.transferReportID);
  let address = data.address;
  let storeName = data.storeName;
  let dateCreated = data.dateCreated;
  let deliveryDateTime = data.deliveryDateTime;
  let expedited = data.expedited

  let updateQuery = 
                  `
                    UPDATE TransferReports 
                    SET 
                    distributionCenterID = 
                      (
                        SELECT distributionCenterID 
                        FROM DistributionCenters 
                        WHERE DistributionCenters.address = ?
                      ), 
                    storeID = 
                      (
                        SELECT storeID 
                        FROM Stores 
                        WHERE Stores.storeName = ?
                      ), dateCreated = ?, deliveryDateTime = ?, expedited = ? 
                    WHERE transferReportID = ?
                  `;

  db.pool.query(
    updateQuery,
    [address, storeName, dateCreated, deliveryDateTime, expedited, transferReportID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});


// Stores Routes
app.get("/Stores", function (req, res) {
  let selectQuery = "SELECT storeID, storeName, phoneNumber, email, address FROM Stores;";
  db.pool.query(selectQuery, function(error, rows, fields) {
    res.render("Stores", {
      helpers: {
        title: "Footwear Distro: Stores Page",
        h1: "<h1>Footwear Distro: Stores Page</h1>",
      },
      data: rows
    });
  })
});

app.post("/addStores", function (req, res) {
  let data = req.body;

  let insertQuery = 
                  `
                    INSERT INTO Stores(storeName, phoneNumber, email, address) 
                    VALUES 
                    (
                      '${data["input-storeName"]}', 
                      '${data["input-phoneNumber"]}', 
                      '${data["input-email"]}', 
                      '${data["input-address"]}'
                    )
                  `;
  db.pool.query(insertQuery, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect("/Stores");
    }
  });
});

app.delete("/deleteStores", function (req, res) {
  let data = req.body;
  let storeID = parseInt(data.storeID);
  let deleteQuery = `DELETE FROM Stores WHERE storeID = ?`;

  db.pool.query(
    deleteQuery,
    [storeID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.put("/updateStores", function (req, res) {
  let data = req.body;

  let storeID = parseInt(data.storeID);
  let storeName = data.storeName;
  let phoneNumber = data.phoneNumber;
  let email = data.email;
  let address = data.address;

  let updateQuery = 
                  `
                    UPDATE Stores 
                    SET storeName = ?, 
                    phoneNumber = ?, 
                    email = ?, 
                    address = ? 
                    WHERE storeID = ?
                  `;

  db.pool.query(
    updateQuery,
    [storeName, phoneNumber, email, address, storeID],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
