package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var (
    Client *sql.DB
)

func init() {
    var err error
    Client, err = sql.Open("mysql", "root:ayubkot123@tcp(localhost:3306)/hellodb")
    if err != nil {
        fmt.Printf("Error opening database: %v\n", err)
        return
    }

    err = Client.Ping()
    if err != nil {
        fmt.Printf("Error connecting to database: %v\n", err)
        return
    }

    fmt.Println("Connected to MySQL database!")
}
