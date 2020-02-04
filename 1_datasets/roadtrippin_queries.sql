USE roadtrippin;

-- Select Tables 
SELECT * FROM bridge_condition_summary;
SELECT * FROM bridges;
SELECT * FROM centerpoints;
SELECT * FROM dc_potholes;
SELECT * FROM estimate_bridge_cost_2018dollars;
SELECT * FROM ny_crash_ditch;
SELECT * FROM road_condition_summary;
SELECT * FROM roads;
SELECT * FROM spending_bystate_2017dollars;
SELECT * FROM spending_bystate_fraction_exp;
SELECT * FROM spending_bystate_percapita_2017dollars;
SELECT * FROM spending_state_2017dollars;
SELECT * FROM spending_oecd_2018euros;
SELECT * FROM spending_fedstate_percentgdp;
SELECT * FROM spending_fedstate_2017dollars;
SELECT * FROM spending_fed_2017dollars;
SELECT * FROM tunnel_condition_summary;
SELECT * FROM tunnels;


-- Operations for bridges
SELECT * FROM bridge_condition_summary;
ALTER TABLE bridge_condition_summary
	MODIFY COLUMN State VARCHAR(255);
ALTER TABLE bridge_condition_summary
	MODIFY COLUMN State_Abbreviation VARCHAR(255);
ALTER TABLE bridge_condition_summary
	ADD PRIMARY KEY (ID);


-- Operations for bridges
SELECT * FROM bridges;
ALTER TABLE bridges
	MODIFY COLUMN State_Code VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Features_Intersected VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Facility_Carried VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Lat FLOAT;
ALTER TABLE bridges
	MODIFY COLUMN `Long` FLOAT;
ALTER TABLE bridges
	MODIFY COLUMN Year_Built INT;
ALTER TABLE bridges
	MODIFY COLUMN Avg_Daily_Traffic FLOAT;
ALTER TABLE bridges
	MODIFY COLUMN Structure_Kind VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Structure_Type VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Length FLOAT;
ALTER TABLE bridges
	MODIFY COLUMN Improvement_Cost FLOAT;
ALTER TABLE bridges
	MODIFY COLUMN Year_Reconstructed VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Deck_Strucutre_Type INT;
ALTER TABLE bridges
	MODIFY COLUMN Surface_Type VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Membrane_Type VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Deck_Protection VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN Percent_Truck_Traffic FLOAT;
ALTER TABLE bridges
	MODIFY COLUMN Score VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN `Bridge Condition Detail` VARCHAR(255);
ALTER TABLE bridges
	MODIFY COLUMN State_Abbreviation VARCHAR(255);
ALTER TABLE bridges
	ADD PRIMARY KEY (ID);
ALTER TABLE bridges RENAME COLUMN `Bridge Condition Detail` TO Bridge_Condition_Detail;
SELECT * FROM bridges
	WHERE State_Abbreviation = "AL";


-- Operations for centerpoints 
SELECT * FROM centerpoints;
ALTER TABLE centerpoints
	MODIFY COLUMN State VARCHAR(255);
ALTER TABLE centerpoints
	MODIFY COLUMN Latitude FLOAT;
ALTER TABLE centerpoints
	MODIFY COLUMN Longitude FLOAT;
ALTER TABLE centerpoints
	MODIFY COLUMN State_Abbreviation VARCHAR(255);
ALTER TABLE centerpoints
	ADD PRIMARY KEY (State_Abbreviation);


-- Operations of dc_potholes
SELECT * FROM dc_potholes;
ALTER TABLE dc_potholes RENAME COLUMN `Unnamed: 0` TO ID;
UPDATE dc_potholes SET ID = ID + 1;
ALTER TABLE dc_potholes
	ADD PRIMARY KEY (ID);
ALTER TABLE dc_potholes
	MODIFY COLUMN ID INT;
ALTER TABLE dc_potholes
	MODIFY COLUMN X FLOAT;
ALTER TABLE dc_potholes
	MODIFY COLUMN Y FLOAT;
ALTER TABLE dc_potholes
	MODIFY COLUMN OBJECTID INT;
ALTER TABLE dc_potholes
	MODIFY COLUMN SERVICECODE VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN SERVICECODEDESCRIPTION VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN SERVICETYPECODEDESCRIPTION VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN ORGANIZATIONACRONYM VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN ADDDATE VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN RESOLUTIONDATE VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN SERVICEDUEDATE VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN INSPECTIONDATE VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN INSPECTORNAME VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN SERVICEORDERSTATUS VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN PRIORITY VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN STREETADDRESS VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN XCOORD FLOAT;
ALTER TABLE dc_potholes
	MODIFY COLUMN YCOORD FLOAT;
ALTER TABLE dc_potholes
	MODIFY COLUMN LATITUDE FLOAT;
ALTER TABLE dc_potholes
	MODIFY COLUMN LONGITUDE FLOAT;
ALTER TABLE dc_potholes
	MODIFY COLUMN CITY VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN STATE VARCHAR(255);
ALTER TABLE dc_potholes
	MODIFY COLUMN ZIPCODE INT;


-- Operations for estimate_bridge_cost_2018dollars
SELECT * FROM estimate_bridge_cost_2018dollars;
ALTER TABLE estimate_bridge_cost_2018dollars
	MODIFY COLUMN STATE VARCHAR(255);
ALTER TABLE estimate_bridge_cost_2018dollars
	MODIFY COLUMN STATE_Abbreviation VARCHAR(255);
ALTER TABLE estimate_bridge_cost_2018dollars
	ADD PRIMARY KEY (State_Abbreviation);
ALTER TABLE estimate_bridge_cost_2018dollars RENAME COLUMN STATE TO State;
ALTER TABLE estimate_bridge_cost_2018dollars RENAME COLUMN STATE_Abbreviation TO State_Abbreviation;
ALTER TABLE estimate_bridge_cost_2018dollars RENAME COLUMN `Estimated Total Cost of Replacement` TO Estimated_Total_Cost_of_Replacement;
ALTER TABLE estimate_bridge_cost_2018dollars RENAME COLUMN `Estimated Total Cost of Rehab` TO Estimated_Total_Cost_of_Rehab;


-- Operations for ny_crash_ditch
SELECT * FROM ny_crash_ditch;
ALTER TABLE ny_crash_ditch 
	DROP COLUMN `Unnamed: 0`;
ALTER TABLE ny_crash_ditch 
	ADD COLUMN ID INT NOT NULL AUTO_INCREMENT,
	ADD PRIMARY KEY (ID);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN `Crash Descriptor` VARCHAR(255);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN `Date` VARCHAR(255);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN Municipality VARCHAR(255);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN `Collision Type Descriptor` VARCHAR(255);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN `County Name` VARCHAR(255);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN `Road Descriptor` VARCHAR(255);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN `Weather Conditions` VARCHAR(255);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN `Road Surface Conditions` VARCHAR(255);
ALTER TABLE ny_crash_ditch
	MODIFY COLUMN `Event Descriptor` VARCHAR(255);
ALTER TABLE ny_crash_ditch RENAME COLUMN `Crash Descriptor` TO Crash_Descriptor;
ALTER TABLE ny_crash_ditch RENAME COLUMN `Collision Type Descriptor` TO Collision_Type_Descriptor;
ALTER TABLE ny_crash_ditch RENAME COLUMN `County Name` TO County_Name;
ALTER TABLE ny_crash_ditch RENAME COLUMN `Road Descriptor` TO Road_Descriptor;
ALTER TABLE ny_crash_ditch RENAME COLUMN `Weather Conditions` TO Weather_Conditions;
ALTER TABLE ny_crash_ditch RENAME COLUMN `Road Surface Conditions` TO Road_Surface_Conditions;
ALTER TABLE ny_crash_ditch RENAME COLUMN `Event Descriptor` TO Event_Descriptor;
ALTER TABLE ny_crash_ditch RENAME COLUMN `Number of Vehicles Involved` TO Number_of_Vehicles_Involved;


-- Operations for bridges
SELECT * FROM road_condition_summary;
ALTER TABLE road_condition_summary
	MODIFY COLUMN State VARCHAR(255);
ALTER TABLE road_condition_summary
	MODIFY COLUMN Total FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN Not_Reported FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN Good_below95 FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN Fair_95to170 FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN Poor_above170 FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN NotReported_Percentage FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN Good_Percentage FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN Fair_Percentage FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN Poor_Percentage FLOAT;
ALTER TABLE road_condition_summary
	MODIFY COLUMN State_Abbreviation VARCHAR(255);
ALTER TABLE road_condition_summary
	ADD PRIMARY KEY (State);
    

-- Operations for roads
SELECT * FROM roads;
ALTER TABLE roads ADD COLUMN ID INT NOT NULL AUTO_INCREMENT,
	ADD PRIMARY KEY (ID);
ALTER TABLE roads
	MODIFY COLUMN State VARCHAR(255);
ALTER TABLE roads
	MODIFY COLUMN Location VARCHAR(255);
ALTER TABLE roads
	MODIFY COLUMN Not_Reported FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `<60` FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `60-94` FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `95-119` FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `120-144` FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `145-170` FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `171-194` FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `195-220` FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `>220` FLOAT;
ALTER TABLE roads
	MODIFY COLUMN `Ride_Quality` FLOAT;


-- Operations for spending_bystate_2017dollars;
SELECT * FROM spending_bystate_2017dollars;
ALTER TABLE spending_bystate_2017dollars
	ADD PRIMARY KEY (ID);
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN ID INT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN State VARCHAR(255);
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN Year INT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(R01) Total Revenue` BIGINT;
ALTER TABLE spending_bystate_2017dollars
		MODIFY COLUMN `(E001) Total Expenditure` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E065) Total Highways-Dir Exp` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E066) Total Highways-Cur Op` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E067) Total Highways-Cap Out` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E068) Regular Hwy-Direct Exp` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E069) Regular Hwy-Cur Oper (E44)` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E070) Regular Hwy-Cap Outlay` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E071) Toll Hwy-Total Expend` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E072) Toll Hwy-Current Oper (E45)` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN `(E073) Toll Hwy-Cap Outlay` BIGINT;
ALTER TABLE spending_bystate_2017dollars
	MODIFY COLUMN State_Abbreviation VARCHAR(255);
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(R01) Total Revenue` TO Total_Revenue;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E001) Total Expenditure` TO Total_Expenditure;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E065) Total Highways-Dir Exp` TO Total_Hwy_DirExp;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E066) Total Highways-Cur Op` TO Total_Hwy_CurOp;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E067) Total Highways-Cap Out` TO Total_Hwy_CapOut;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E068) Regular Hwy-Direct Exp` TO Regular_Hwy_DirExp;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E069) Regular Hwy-Cur Oper (E44)` TO Regular_Hwy_CurOp;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E070) Regular Hwy-Cap Outlay` TO Regular_Hwy_CapOut;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E071) Toll Hwy-Total Expend` TO Toll_Hwy_TotalExp;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E072) Toll Hwy-Current Oper (E45)` TO Toll_Hwy_CurOp;
ALTER TABLE spending_bystate_2017dollars RENAME COLUMN `(E073) Toll Hwy-Cap Outlay` TO Toll_Hwy_CapOut;

-- Operations for spending_bystate_fraction_exp;
SELECT * FROM spending_bystate_fraction_exp;
ALTER TABLE spending_bystate_fraction_exp
	ADD PRIMARY KEY (ID);
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN ID INT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN State VARCHAR(255);
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN Year INT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(R01) Total Revenue` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E001) Total Expenditure` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E065) Total Highways-Dir Exp` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E066) Total Highways-Cur Op` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E067) Total Highways-Cap Out` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E068) Regular Hwy-Direct Exp` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E069) Regular Hwy-Cur Oper (E44)` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E070) Regular Hwy-Cap Outlay` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E071) Toll Hwy-Total Expend` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E072) Toll Hwy-Current Oper (E45)` FLOAT;
ALTER TABLE spending_bystate_fraction_exp
	MODIFY COLUMN `(E073) Toll Hwy-Cap Outlay` FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN State_Abbreviation VARCHAR(255);
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN ID INT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN State VARCHAR(255);
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Year INT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Total_Revenue FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Total_Expenditure FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Total_Hwy_DirExp FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Total_Hwy_CurOp FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Total_Hwy_CapOut FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Regular_Hwy_DirExp FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Regular_Hwy_CurOp FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Regular_Hwy_CapOut FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Toll_Hwy_TotalExp FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Toll_Hwy_CurOp FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN Toll_Hwy_CapOut FLOAT;
-- ALTER TABLE spending_bystate_fraction_exp
-- 	MODIFY COLUMN State_Abbreviation VARCHAR(255);
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(R01) Total Revenue` TO Total_Revenue;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E001) Total Expenditure` TO Total_Expenditure;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E065) Total Highways-Dir Exp` TO Total_Hwy_DirExp;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E066) Total Highways-Cur Op` TO Total_Hwy_CurOp;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E067) Total Highways-Cap Out` TO Total_Hwy_CapOut;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E068) Regular Hwy-Direct Exp` TO Regular_Hwy_DirExp;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E069) Regular Hwy-Cur Oper (E44)` TO Regular_Hwy_CurOp;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E070) Regular Hwy-Cap Outlay` TO Regular_Hwy_CapOut;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E071) Toll Hwy-Total Expend` TO Toll_Hwy_TotalExp;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E072) Toll Hwy-Current Oper (E45)` TO Toll_Hwy_CurOp;
ALTER TABLE spending_bystate_fraction_exp RENAME COLUMN `(E073) Toll Hwy-Cap Outlay` TO Toll_Hwy_CapOut;



-- Operations for spending_bystate_percapita_2017dollars;
SELECT * FROM spending_bystate_percapita_2017dollars;
ALTER TABLE spending_bystate_percapita_2017dollars
	ADD PRIMARY KEY (ID);
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN ID INT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN State VARCHAR(255);
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN Year INT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(R01) Total Revenue` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E001) Total Expenditure` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E065) Total Highways-Dir Exp` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
		MODIFY COLUMN `(E066) Total Highways-Cur Op` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E067) Total Highways-Cap Out` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E068) Regular Hwy-Direct Exp` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E069) Regular Hwy-Cur Oper (E44)` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E070) Regular Hwy-Cap Outlay` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E071) Toll Hwy-Total Expend` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E072) Toll Hwy-Current Oper (E45)` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN `(E073) Toll Hwy-Cap Outlay` BIGINT;
ALTER TABLE spending_bystate_percapita_2017dollars
	MODIFY COLUMN State_Abbreviation VARCHAR(255);
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(R01) Total Revenue` TO Total_Revenue;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E001) Total Expenditure` TO Total_Expenditure;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E065) Total Highways-Dir Exp` TO Total_Hwy_DirExp;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E066) Total Highways-Cur Op` TO Total_Hwy_CurOp;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E067) Total Highways-Cap Out` TO Total_Hwy_CapOut;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E068) Regular Hwy-Direct Exp` TO Regular_Hwy_DirExp;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E069) Regular Hwy-Cur Oper (E44)` TO Regular_Hwy_CurOp;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E070) Regular Hwy-Cap Outlay` TO Regular_Hwy_CapOut;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E071) Toll Hwy-Total Expend` TO Toll_Hwy_TotalExp;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E072) Toll Hwy-Current Oper (E45)` TO Toll_Hwy_CurOp;
ALTER TABLE spending_bystate_percapita_2017dollars RENAME COLUMN `(E073) Toll Hwy-Cap Outlay` TO Toll_Hwy_CapOut;


-- Operations for spending_state_2017dollars;
SELECT * FROM spending_state_2017dollars;
ALTER TABLE spending_state_2017dollars
	ADD PRIMARY KEY (Year);
ALTER TABLE spending_state_2017dollars RENAME COLUMN `All (Total)` TO All_Total;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `All (Capital)` TO All_Capital;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `All (O&M)` TO All_OM;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Highways (Total)` TO Highways_Total;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Highways (Capital)` TO Highways_Capital;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Highways (O&M)` TO Highway_OM;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Mass Transit (Total)` TO MassTransit_Total;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Mass Transit (Capital)` TO MassTransit_Capital;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Mass Transit (O&M)` TO MassTransit_OM;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Rail (Total)` TO Rail_Total;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Rail (Capital)` TO Rail_Capital;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Rail (O&M)` TO Rail_OM;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Aviation (Total)` TO Aviation_Total;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Aviation (Capital)` TO Aviation_Capital;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Aviation (O&M)` TO Aviation_OM;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Transportation (Total)` TO WaterTransportation_Total;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Transportation (Capital)` TO WaterTransportatio_Capital;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Transportation (O&M)` TO Water_Transportation_OM;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Resources (Total)` TO WaterResources_Total;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Resources (Capital)` TO WaterResources_Capital;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Resources (O&M)` TO WaterResources_OM;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Utilities (Total)` TO WaterUtilities_Total;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Utilities (Capital)` TO WaterUtilities_Capital;
ALTER TABLE spending_state_2017dollars RENAME COLUMN `Water Utilities (O&M)` TO WaterUtilities_OM;


-- Operations for spending_oecd_2018euros;
SELECT * FROM spending_oecd_2018euros;
ALTER TABLE spending_oecd_2018euros
	ADD PRIMARY KEY (ID);
ALTER TABLE spending_oecd_2018euros
	MODIFY COLUMN ID INT;
ALTER TABLE spending_oecd_2018euros
	MODIFY COLUMN Country VARCHAR(255);
ALTER TABLE spending_oecd_2018euros
	MODIFY COLUMN `Investment Amount` BIGINT;
ALTER TABLE spending_oecd_2018euros
	MODIFY COLUMN `Investment Type` VARCHAR(255);
ALTER TABLE spending_oecd_2018euros
	MODIFY COLUMN Measure VARCHAR(255);
ALTER TABLE spending_oecd_2018euros
	MODIFY COLUMN Population BIGINT;
ALTER TABLE spending_oecd_2018euros
	MODIFY COLUMN Year INT;
ALTER TABLE spending_oecd_2018euros
	MODIFY COLUMN `Spending per Capita` FLOAT;
ALTER TABLE spending_oecd_2018euros RENAME COLUMN `Investment Amount` TO Investment_Amount;
ALTER TABLE spending_oecd_2018euros RENAME COLUMN `Investment Type` TO Investment_Type;
ALTER TABLE spending_oecd_2018euros RENAME COLUMN `Spending per Capita` TO Spending_perCapita;
SELECT * FROM spending_oecd_2018euros
	WHERE Investment_Type = "Total road spending";


-- Operations for spending_fedstate_percentgdp;
SELECT * FROM spending_fedstate_percentgdp;
ALTER TABLE spending_fedstate_percentgdp
	ADD PRIMARY KEY (Year);
ALTER TABLE spending_fedstate_percentgdp
	MODIFY COLUMN Year BIGINT;
ALTER TABLE spending_fedstate_percentgdp
	MODIFY COLUMN `Federal (Billions of 2017 Dollars)` FLOAT;
ALTER TABLE spending_fedstate_percentgdp
	MODIFY COLUMN `State and Local (Billions of 2017 Dollars)` FLOAT;
ALTER TABLE spending_fedstate_percentgdp
	MODIFY COLUMN `Federal (% GDP)` FLOAT;
ALTER TABLE spending_fedstate_percentgdp
	MODIFY COLUMN `State and Local (% GDP)` FLOAT;
ALTER TABLE spending_fedstate_percentgdp RENAME COLUMN `Federal (Billions of 2017 Dollars)` TO Federal_BillionsOf2017Dollars;
ALTER TABLE spending_fedstate_percentgdp RENAME COLUMN `State and Local (Billions of 2017 Dollars)` TO StateLocal_BillionsOf2017Dollars;
ALTER TABLE spending_fedstate_percentgdp RENAME COLUMN `Federal (% GDP)` TO Federal_percentGDP;
ALTER TABLE spending_fedstate_percentgdp RENAME COLUMN `State and Local (% GDP)` TO StateLocal_percentGDP;


-- Operations for spending_fedstate_2017dollars;
SELECT * FROM spending_fedstate_2017dollars;
ALTER TABLE spending_fedstate_2017dollars
	ADD PRIMARY KEY (Year);
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `All (Total)` TO All_Total;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `All (Capital)` TO All_Capital;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `All (O&M)` TO All_OM;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Highways (Total)` TO Highways_Total;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Highways (Capital)` TO Highways_Capital;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Highways (O&M)` TO Highway_OM;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Mass Transit (Total)` TO MassTransit_Total;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Mass Transit (Capital)` TO MassTransit_Capital;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Mass Transit (O&M)` TO MassTransit_OM;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Rail (Total)` TO Rail_Total;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Rail (Capital)` TO Rail_Capital;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Rail (O&M)` TO Rail_OM;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Aviation (Total)` TO Aviation_Total;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Aviation (Capital)` TO Aviation_Capital;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Aviation (O&M)` TO Aviation_OM;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Transportation (Total)` TO WaterTransportation_Total;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Transportation (Capital)` TO WaterTransportatio_Capital;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Transportation (O&M)` TO Water_Transportation_OM;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Resources (Total)` TO WaterResources_Total;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Resources (Capital)` TO WaterResources_Capital;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Resources (O&M)` TO WaterResources_OM;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Utilities (Total)` TO WaterUtilities_Total;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Utilities (Capital)` TO WaterUtilities_Capital;
ALTER TABLE spending_fedstate_2017dollars RENAME COLUMN `Water Utilities (O&M)` TO WaterUtilities_OM;


-- Operations for spending_fed_2017dollars;
SELECT * FROM spending_fed_2017dollars;
ALTER TABLE spending_fed_2017dollars
	ADD PRIMARY KEY (Year);
ALTER TABLE spending_fed_2017dollars
	DROP PRIMARY KEY;
SHOW KEYS FROM spending_fed_2017dollars WHERE Key_name = 'PRIMARY';
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `All (Total)` TO All_Total;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `All (Capital)` TO All_Capital;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `All (O&M)` TO All_OM;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Highways (Total)` TO Highways_Total;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Highways (Capital)` TO Highways_Capital;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Highways (O&M)` TO Highway_OM;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Mass Transit (Total)` TO MassTransit_Total;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Mass Transit (Capital)` TO MassTransit_Capital;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Mass Transit (O&M)` TO MassTransit_OM;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Rail (Total)` TO Rail_Total;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Rail (Capital)` TO Rail_Capital;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Rail (O&M)` TO Rail_OM;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Aviation (Total)` TO Aviation_Total;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Aviation (Capital)` TO Aviation_Capital;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Aviation (O&M)` TO Aviation_OM;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Transportation (Total)` TO WaterTransportation_Total;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Transportation (Capital)` TO WaterTransportatio_Capital;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Transportation (O&M)` TO Water_Transportation_OM;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Resources (Total)` TO WaterResources_Total;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Resources (Capital)` TO WaterResources_Capital;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Resources (O&M)` TO WaterResources_OM;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Utilities (Total)` TO WaterUtilities_Total;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Utilities (Capital)` TO WaterUtilities_Capital;
ALTER TABLE spending_fed_2017dollars RENAME COLUMN `Water Utilities (O&M)` TO WaterUtilities_OM;


-- Operations for bridges
SELECT * FROM tunnel_condition_summary;
ALTER TABLE tunnel_condition_summary
	MODIFY COLUMN State VARCHAR(255);
ALTER TABLE tunnel_condition_summary
	MODIFY COLUMN Condition_State_1_Percentage FLOAT;
ALTER TABLE tunnel_condition_summary
	MODIFY COLUMN Condition_State_2_Percentage FLOAT;
ALTER TABLE tunnel_condition_summary
	MODIFY COLUMN Condition_State_3_Percentage FLOAT;
ALTER TABLE tunnel_condition_summary
	MODIFY COLUMN Condition_State_4_Percentage FLOAT;
ALTER TABLE tunnel_condition_summary
	MODIFY COLUMN State_Abbreviation VARCHAR(255);
ALTER TABLE tunnel_condition_summary
	ADD PRIMARY KEY (State);
    

-- Operations for tunnels;
SELECT * FROM tunnels;
ALTER TABLE tunnels RENAME COLUMN `index` TO ID;
UPDATE tunnels SET ID = ID + 1;
ALTER TABLE tunnels
	ADD PRIMARY KEY (ID);
ALTER TABLE tunnels
	MODIFY COLUMN Tunnel_Number VARCHAR(255);
ALTER TABLE tunnels
	MODIFY COLUMN Tunnel_Name VARCHAR(255);
ALTER TABLE tunnels
	MODIFY COLUMN State_Code VARCHAR(255);
ALTER TABLE tunnels
	MODIFY COLUMN Route_Type VARCHAR(255);
ALTER TABLE tunnels
	MODIFY COLUMN Latitude FLOAT;
ALTER TABLE tunnels
	MODIFY COLUMN Longitude FLOAT;
ALTER TABLE tunnels
	MODIFY COLUMN AADTT FLOAT;
ALTER TABLE tunnels
	MODIFY COLUMN Class VARCHAR(255);
ALTER TABLE tunnels
	MODIFY COLUMN Tunnel_Shape VARCHAR(255);
ALTER TABLE tunnels
	MODIFY COLUMN Ground_Conditions VARCHAR(255);
ALTER TABLE tunnels
	MODIFY COLUMN State_Abbreviation VARCHAR(255);