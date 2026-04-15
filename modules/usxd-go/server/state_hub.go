package server

import (
	"sync"

	usxd "github.com/fredporter/uDosConnect/modules/usxd-go"
)

type StateHub struct {
	mu    sync.RWMutex
	state usxd.State
}

func NewStateHub(initial usxd.State) *StateHub {
	return &StateHub{state: initial}
}

func (h *StateHub) Get() usxd.State {
	h.mu.RLock()
	defer h.mu.RUnlock()
	return h.state
}

func (h *StateHub) Set(s usxd.State) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.state = s
}
