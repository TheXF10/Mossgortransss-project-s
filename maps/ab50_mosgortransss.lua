local Map = game.GetMap() or ""

if Map:find("gm_metrostroi") and not Map:find("lite") then
    Metrostroi.PlatformMap = "gm_mus_orange"
	Metrostroi.CurrentMap = "gm_metrostroi"
else
	return
end

