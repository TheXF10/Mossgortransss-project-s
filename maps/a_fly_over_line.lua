local Map = game.GetMap() or ""
if Map:find("gm_fly_over") and Map:find("line") then
    Metrostroi.PlatformMap = "fly_over_line"
    Metrostroi.CurrentMap = "fly_over_line"
	print("true")
else
    return
end
--[[ it suck
Metrostroi.AddLastStationTex("702", 9999, "metrostroi_skins/702/metrozzz_net_702")
Metrostroi.AddLastStationTex("710", 9999, "metrostroi_skins/717/metrozzz_net_717")
Metrostroi.AddLastStationTex("717", 9999, "metrostroi_skins/717/metrozzz_net_717")
Metrostroi.AddLastStationTex("720", 9999, "metrostroi_skins/717/metrozzz_net_717")

Metrostroi.AddLastStationTex("702", 99999, "metrostroi_skins/702/metrozzz_nach_702")
Metrostroi.AddLastStationTex("710", 99999, "metrostroi_skins/717/metrozzz_nach_717")
Metrostroi.AddLastStationTex("717", 99999, "metrostroi_skins/717/metrozzz_nach_717")
Metrostroi.AddLastStationTex("720", 99999, "metrostroi_skins/717/metrozzz_nach_717")
]]
Metrostroi.AddLastStationTex("717", 11115, "metrostroi_skins/mosgortransss_present")