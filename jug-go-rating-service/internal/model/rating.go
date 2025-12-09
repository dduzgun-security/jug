package model

import "time"

type Rating struct {
	ID                int64     `db:"id"`
	UserID            int64     `db:"user_id"`
	Restaurant        string    `db:"restaurant"`
	CheeseSqueakiness uint32    `db:"cheese_squeakiness"`
	GravyThickness    uint32    `db:"gravy_thickness"`
	FriesCrispiness   uint32    `db:"fries_crispiness"`
	Size              string    `db:"size"`
	Comments          string    `db:"comments"`
	CreatedAt         time.Time `db:"created_at"`
}
