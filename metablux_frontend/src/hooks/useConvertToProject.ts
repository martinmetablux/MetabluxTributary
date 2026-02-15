import { useState } from "react";
import axios from "axios";

export function useConvertToProject() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeals, setSelectedDeals] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const [projectDetails, setProjectDetails] = useState<any>({});
    const [clientDetails, setClientDetails] = useState<any>({});
    const [siteZoneDetails, setSiteZoneDetails] = useState<any>({});
    const [verticalDetails, setVerticalDetails] = useState<any>({});

    // Update the handleConvertToProject function to include the vertical name
    const handleConvertToProject = async () => {
    if (selectedDeals.length === 0) {
      console.error("No deal selected");
      return;
    }

    // Extract the selected PO and Quote file details from projectDetails
  let finalPOData = null;
  let finalQuoteData = null;

  try {
    const parsedFinalPO = projectDetails.finalPO ? JSON.parse(projectDetails.finalPO) : null;
    const parsedFinalQuote = projectDetails.finalQuote ? JSON.parse(projectDetails.finalQuote) : null;

    if (parsedFinalPO && Array.isArray(projectDetails.poFiles)) {
      const selectedPO = projectDetails.poFiles.find((po) => po.url === parsedFinalPO.fileUrl);
      if (selectedPO) {
        finalPOData = {
          filename: selectedPO.filename,
          date: selectedPO.date,
          filepath: selectedPO.filepath,
        };
      }
    }

    if (parsedFinalQuote && Array.isArray(projectDetails.quoteFiles)) {
        const selectedQuote = projectDetails.quoteFiles.find(
          (quote) => quote.url === parsedFinalQuote.fileUrl
        );
        if (selectedQuote) {
          finalQuoteData = {
            filename: selectedQuote.filename,
            date: selectedQuote.date,
            filepath: selectedQuote.filepath,
          };
        }
      }
    } catch (error) {
      console.error("Error parsing PO/Quote files:", error);
    }
    
    const payload = {
      deal_id: selectedDeals[0],
      master_id: user?.master_id,  // Add master ID from user context
      workspace_id: user?.workspace_id, 
      project_details: {
        ...projectDetails,
        finalPO: finalPOData,
        finalQuote: finalQuoteData,
      },

    //   client_details: {
    //     company_name: clientDetails.company_name,
    //     contact_person: {
    //       name: clientDetails.name,
    //       designation: clientDetails.designation,
    //       phone: clientDetails.phone,
    //       contact_id: clientDetails.contact_id
    //     }
    //   },
    client_details: {
        bd_accounts_id: clientDetails.bd_accounts_id, // ✅ company ID
        contact_ids: clientDetails.contact_ids        // ✅ selected contact IDs
      },
      sitezone_details: {
        ...siteZoneDetails,
        site_zone_id: siteZoneDetails?.id || siteZoneDetails?.site_zone_id || null,
        isNewSite: siteZoneDetails?.isNewSite || false
      },
      vertical_details: {
        vertical_id: verticalDetails.selected_vertical_id,
        vertical_name: verticalDetails.selected_vertical_name,
        capacity: verticalDetails.capacity,
        currency: verticalDetails.currency,
        unit_price: verticalDetails.unit_price,
        total_price: verticalDetails.total_price,
        gsd: verticalDetails.gsd,
        altitude: verticalDetails.altitude,
        volt_capacity: verticalDetails.volt_capacity,
        circuit_voltage: verticalDetails.circuit_voltage
      }
    };
    
  
    console.log("🚀 Final payload:", payload);
  
    try {
      const response = await axios.post(
        `/api/bd/deals/${selectedDeals[0]}/convert-to-project`, 
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      // Handle success

       // ✅ Show success toast
    addToast("Deal successfully converted to project!", "success", "Success");

    // ✅ Close the modal
    setOpen(null);

    // ✅ Clear selections
    setSelectedDeals([]);
    setCurrentDeal(null);

    } catch (error) {
      console.error("Conversion failed:", error);
      // Handle error

      addToast(
        error.response?.data?.message ||
          "Failed to convert deal to project. Please try again.",
        "error",
        "Error"
      );
  
    }
    };

    const handleSubmitAndAddNewProject = async () => {

        if (selectedDeals.length === 0) {
        console.error("No deal selected");
        return;
        }

        // Extract the selected PO and Quote file details from projectDetails
        let finalPOData = null;
        let finalQuoteData = null;

        try {
        const parsedFinalPO = projectDetails.finalPO ? JSON.parse(projectDetails.finalPO) : null;
        const parsedFinalQuote = projectDetails.finalQuote ? JSON.parse(projectDetails.finalQuote) : null;

        if (parsedFinalPO && Array.isArray(projectDetails.poFiles)) {
        const selectedPO = projectDetails.poFiles.find((po) => po.url === parsedFinalPO.fileUrl);
        if (selectedPO) {
            finalPOData = {
            filename: selectedPO.filename,
            date: selectedPO.date,
            filepath: selectedPO.filepath,
            };
        }
        }

        if (parsedFinalQuote && Array.isArray(projectDetails.quoteFiles)) {
            const selectedQuote = projectDetails.quoteFiles.find(
            (quote) => quote.url === parsedFinalQuote.fileUrl
            );
            if (selectedQuote) {
            finalQuoteData = {
                filename: selectedQuote.filename,
                date: selectedQuote.date,
                filepath: selectedQuote.filepath,
            };
            }
        }
        } catch (error) {
        console.error("Error parsing PO/Quote files:", error);
        }
    
        const payload = {
            deal_id: selectedDeals[0],
            master_id: user?.master_id,  // Add master ID from user context
            workspace_id: user?.workspace_id, 
            project_details: {
            ...projectDetails,
            finalPO: finalPOData,
            finalQuote: finalQuoteData,
            },
            client_details: {
            bd_accounts_id: clientDetails.bd_accounts_id, // ✅ company ID
            contact_ids: clientDetails.contact_ids        // ✅ selected contact IDs
            },
            sitezone_details: {
            ...siteZoneDetails,
            site_zone_id: siteZoneDetails?.id || siteZoneDetails?.site_zone_id || null,
            isNewSite: siteZoneDetails?.isNewSite || false
            },
            vertical_details: {
            vertical_id: verticalDetails.selected_vertical_id,
            vertical_name: verticalDetails.selected_vertical_name,
            capacity: verticalDetails.capacity,
            currency: verticalDetails.currency,
            unit_price: verticalDetails.unit_price,
            total_price: verticalDetails.total_price,
            gsd: verticalDetails.gsd,
            altitude: verticalDetails.altitude,
            volt_capacity: verticalDetails.volt_capacity,
            circuit_voltage: verticalDetails.circuit_voltage
            }
        };
        
        
        console.log("🚀 Final payload:", payload);
    
        try {
        await axios.post(
            `/api/bd/deals/${selectedDeals[0]}/convert-to-project`,
            payload,
            {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );
    
        // ✅ Show success toast
        addToast("Project added successfully! You can add another now.", "success", "Success");
    
        // ✅ Keep modal open
        // (no setOpen(null))
    
        // ✅ Reset site and vertical fields only
        setSiteZoneDetails({
            city: "",
            state: "",
            zone_name: "",
            site_name: "",
            latitude: null,
            longitude: null,
            coordinator_name: null,
            coordinator_contact: null,
            description: "",
            isNewSite: false,
            site_zone_id: null,
        });
    
        setVerticalDetails({
            selected_vertical_id: null,
            selected_vertical_name: "",
            capacity: "",
            currency: "",
            unit_price: "",
            total_price: "",
            gsd: "",
            altitude: "",
            volt_capacity: "",
            circuit_voltage: "",
        });

        setResetTrigger(prev => !prev);
    
        } catch (error: any) {
        console.error("Save failed:", error);
    
        addToast(
            error.response?.data?.message ||
            "Failed to save project. Please try again.",
            "error",
            "Error"
        );
        }
    };
  
    
    return {
        isModalOpen,
        selectedDeals,
        isLoading,
        error,
        openModal,
        closeModal,
        setSelectedDeals,
        handleConvertToProject,
        handleSubmitAndAddNewProject,
        setProjectDetails,
        setClientDetails,
        setSiteZoneDetails,
        setVerticalDetails,
        projectDetails,
        clientDetails,
        siteZoneDetails,
        verticalDetails,
    };
}