package main

import (
	"log"
	"net/http"
	"os"

	usxd "github.com/fredporter/uDosConnect/modules/usxd-go"
	"github.com/fredporter/uDosConnect/modules/usxd-go/server"
)

func main() {
	addr := ":8099"
	if v := os.Getenv("USXD_GO_PORT"); v != "" {
		addr = ":" + v
	}

	hub := server.NewStateHub(usxd.NewBaselineState())

	mux := http.NewServeMux()
	mux.HandleFunc("/api/usxd/state", server.APIStateHandler(hub))
	mux.HandleFunc("/ws/usxd", server.WSHandler(hub))
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	log.Printf("usxd-go %s listening on %s", usxd.Version(), addr)
	log.Printf("state endpoint: http://localhost%s/api/usxd/state", addr)
	log.Printf("websocket: ws://localhost%s/ws/usxd", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}
