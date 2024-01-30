package infoService

import (
	"github.com/shirou/gopsutil/process"
	"os"
)

type MemoryStat struct {
	Size uint64
	RSS  uint64
}

func GetMemoryUsage() (*MemoryStat, error) {
	p, err := process.NewProcess(int32(os.Getpid()))
	if err != nil {
		return nil, err
	}

	memInfo, err := p.MemoryInfo()
	if err != nil {
		return nil, err
	}

	return &MemoryStat{
		Size: memInfo.VMS,
		RSS:  memInfo.RSS,
	}, nil
}
