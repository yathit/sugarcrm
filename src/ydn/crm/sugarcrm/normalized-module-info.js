/**
 * Created by kyawtun on 20/8/14.
 */

var normalized_module_info = {
  "Accounts": {
    "module_name": "Accounts",
    "table_name": "accounts",
    "module_fields": {
      "my_favorite": {
        "name": "my_favorite",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Favorite",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "following": {
        "name": "following",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Following",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "name": {
        "name": "name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "Name:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 150
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "created_by_name",
        "id_name": "",
        "label": "Date Created:",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "modified_by_name",
        "id_name": "",
        "label": "Date Modified:",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "doc_owner": {
        "name": "doc_owner",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Document Onwer",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "user_favorites": {
        "name": "user_favorites",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Users Who Favorite",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": "",
        "default_value": "0"
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned User:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "email": {
        "name": "email",
        "type": "email",
        "group": "email",
        "id_name": "",
        "label": "Email:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "email1": {
        "name": "email1",
        "type": "varchar",
        "group": "email",
        "id_name": "",
        "label": "Email Address",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email2": {
        "name": "email2",
        "type": "varchar",
        "group": "email",
        "id_name": "",
        "label": "Other Email:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "invalid_email": {
        "name": "invalid_email",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Invalid Email:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_opt_out": {
        "name": "email_opt_out",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Email Opt Out:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_addresses_non_primary": {
        "name": "email_addresses_non_primary",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Non-primary emails",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "facebook": {
        "name": "facebook",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Facebook Account",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "twitter": {
        "name": "twitter",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Twitter Account",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "googleplus": {
        "name": "googleplus",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Google Plus ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "account_type": {
        "name": "account_type",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Type:",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Analyst": {
            "name": "Analyst",
            "value": "Analyst"
          },
          "Competitor": {
            "name": "Competitor",
            "value": "Competitor"
          },
          "Customer": {
            "name": "Customer",
            "value": "Customer"
          },
          "Integrator": {
            "name": "Integrator",
            "value": "Integrator"
          },
          "Investor": {
            "name": "Investor",
            "value": "Investor"
          },
          "Partner": {
            "name": "Partner",
            "value": "Partner"
          },
          "Press": {
            "name": "Press",
            "value": "Press"
          },
          "Prospect": {
            "name": "Prospect",
            "value": "Prospect"
          },
          "Reseller": {
            "name": "Reseller",
            "value": "Reseller"
          },
          "Other": {
            "name": "Other",
            "value": "Other"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 50
      },
      "industry": {
        "name": "industry",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Industry:",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Apparel": {
            "name": "Apparel",
            "value": "Apparel"
          },
          "Banking": {
            "name": "Banking",
            "value": "Banking"
          },
          "Biotechnology": {
            "name": "Biotechnology",
            "value": "Biotechnology"
          },
          "Chemicals": {
            "name": "Chemicals",
            "value": "Chemicals"
          },
          "Communications": {
            "name": "Communications",
            "value": "Communications"
          },
          "Construction": {
            "name": "Construction",
            "value": "Construction"
          },
          "Consulting": {
            "name": "Consulting",
            "value": "Consulting"
          },
          "Education": {
            "name": "Education",
            "value": "Education"
          },
          "Electronics": {
            "name": "Electronics",
            "value": "Electronics"
          },
          "Energy": {
            "name": "Energy",
            "value": "Energy"
          },
          "Engineering": {
            "name": "Engineering",
            "value": "Engineering"
          },
          "Entertainment": {
            "name": "Entertainment",
            "value": "Entertainment"
          },
          "Environmental": {
            "name": "Environmental",
            "value": "Environmental"
          },
          "Finance": {
            "name": "Finance",
            "value": "Finance"
          },
          "Government": {
            "name": "Government",
            "value": "Government"
          },
          "Healthcare": {
            "name": "Healthcare",
            "value": "Healthcare"
          },
          "Hospitality": {
            "name": "Hospitality",
            "value": "Hospitality"
          },
          "Insurance": {
            "name": "Insurance",
            "value": "Insurance"
          },
          "Machinery": {
            "name": "Machinery",
            "value": "Machinery"
          },
          "Manufacturing": {
            "name": "Manufacturing",
            "value": "Manufacturing"
          },
          "Media": {
            "name": "Media",
            "value": "Media"
          },
          "Not For Profit": {
            "name": "Not For Profit",
            "value": "Not For Profit"
          },
          "Recreation": {
            "name": "Recreation",
            "value": "Recreation"
          },
          "Retail": {
            "name": "Retail",
            "value": "Retail"
          },
          "Shipping": {
            "name": "Shipping",
            "value": "Shipping"
          },
          "Technology": {
            "name": "Technology",
            "value": "Technology"
          },
          "Telecommunications": {
            "name": "Telecommunications",
            "value": "Telecommunications"
          },
          "Transportation": {
            "name": "Transportation",
            "value": "Transportation"
          },
          "Utilities": {
            "name": "Utilities",
            "value": "Utilities"
          },
          "Other": {
            "name": "Other",
            "value": "Other"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 50
      },
      "annual_revenue": {
        "name": "annual_revenue",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Annual Revenue:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_fax": {
        "name": "phone_fax",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Fax:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "billing_address_street": {
        "name": "billing_address_street",
        "type": "text",
        "group": "billing_address",
        "id_name": "",
        "label": "Billing Street:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "billing_address_street_2": {
        "name": "billing_address_street_2",
        "type": "varchar",
        "group": "billing_address",
        "id_name": "",
        "label": "Billing Street 2",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "billing_address_street_3": {
        "name": "billing_address_street_3",
        "type": "varchar",
        "group": "billing_address",
        "id_name": "",
        "label": "Billing Street 3",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "billing_address_street_4": {
        "name": "billing_address_street_4",
        "type": "varchar",
        "group": "billing_address",
        "id_name": "",
        "label": "Billing Street 4",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "billing_address_city": {
        "name": "billing_address_city",
        "type": "varchar",
        "group": "billing_address",
        "id_name": "",
        "label": "Billing City:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "billing_address_state": {
        "name": "billing_address_state",
        "type": "varchar",
        "group": "billing_address",
        "id_name": "",
        "label": "Billing State:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "billing_address_postalcode": {
        "name": "billing_address_postalcode",
        "type": "varchar",
        "group": "billing_address",
        "id_name": "",
        "label": "Billing Postal Code:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "billing_address_country": {
        "name": "billing_address_country",
        "type": "varchar",
        "group": "billing_address",
        "id_name": "",
        "label": "Billing Country:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "rating": {
        "name": "rating",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Rating:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_office": {
        "name": "phone_office",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Office Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_alternate": {
        "name": "phone_alternate",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Alternate Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "website": {
        "name": "website",
        "type": "url",
        "group": "",
        "id_name": "",
        "label": "Website:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 255
      },
      "ownership": {
        "name": "ownership",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Ownership:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "employees": {
        "name": "employees",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Employees:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 10
      },
      "ticker_symbol": {
        "name": "ticker_symbol",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Ticker Symbol:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 10
      },
      "shipping_address_street": {
        "name": "shipping_address_street",
        "type": "text",
        "group": "shipping_address",
        "id_name": "",
        "label": "Shipping Street:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 150
      },
      "shipping_address_street_2": {
        "name": "shipping_address_street_2",
        "type": "varchar",
        "group": "shipping_address",
        "id_name": "",
        "label": "Shipping Street 2",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 150
      },
      "shipping_address_street_3": {
        "name": "shipping_address_street_3",
        "type": "varchar",
        "group": "shipping_address",
        "id_name": "",
        "label": "Shipping Street 3",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 150
      },
      "shipping_address_street_4": {
        "name": "shipping_address_street_4",
        "type": "varchar",
        "group": "shipping_address",
        "id_name": "",
        "label": "Shipping Street 4",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 150
      },
      "shipping_address_city": {
        "name": "shipping_address_city",
        "type": "varchar",
        "group": "shipping_address",
        "id_name": "",
        "label": "Shipping City:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "shipping_address_state": {
        "name": "shipping_address_state",
        "type": "varchar",
        "group": "shipping_address",
        "id_name": "",
        "label": "Shipping State:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "shipping_address_postalcode": {
        "name": "shipping_address_postalcode",
        "type": "varchar",
        "group": "shipping_address",
        "id_name": "",
        "label": "Shipping Postal Code:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 20
      },
      "shipping_address_country": {
        "name": "shipping_address_country",
        "type": "varchar",
        "group": "shipping_address",
        "id_name": "",
        "label": "Shipping Country:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "parent_id": {
        "name": "parent_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Parent Account ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "sic_code": {
        "name": "sic_code",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "SIC Code:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 10
      },
      "duns_num": {
        "name": "duns_num",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "DUNS:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 15
      },
      "parent_name": {
        "name": "parent_name",
        "type": "relate",
        "group": "",
        "id_name": "parent_id",
        "label": "Member of:",
        "required": 0,
        "options": [],
        "related_module": "Accounts",
        "calculated": false,
        "len": 36
      },
      "campaign_id": {
        "name": "campaign_id",
        "type": "id",
        "group": "",
        "id_name": "campaign_id",
        "label": "Campaign ID",
        "required": 0,
        "options": [],
        "related_module": "Campaigns",
        "calculated": false,
        "len": ""
      },
      "campaign_name": {
        "name": "campaign_name",
        "type": "relate",
        "group": "",
        "id_name": "campaign_id",
        "label": "Campaign:",
        "required": 0,
        "options": [],
        "related_module": "Campaigns",
        "calculated": false,
        "len": ""
      }
    },
    "link_fields": {
      "favorite_link": {
        "name": "favorite_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_favorite",
        "module": "",
        "bean_name": ""
      },
      "following_link": {
        "name": "following_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_following",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_activities",
        "module": "Activities",
        "bean_name": "Activity"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "assigned_user_id",
        "relationship": "accounts_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_teams",
        "module": "",
        "bean_name": ""
      },
      "email_addresses_primary": {
        "name": "email_addresses_primary",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_email_addresses_primary",
        "module": "",
        "bean_name": ""
      },
      "email_addresses": {
        "name": "email_addresses",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_email_addresses",
        "module": "",
        "bean_name": ""
      },
      "members": {
        "name": "members",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "member_accounts",
        "module": "Accounts",
        "bean_name": "Account"
      },
      "member_of": {
        "name": "member_of",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "member_accounts",
        "module": "Accounts",
        "bean_name": "Account"
      },
      "cases": {
        "name": "cases",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_cases",
        "module": "Cases",
        "bean_name": "aCase"
      },
      "tasks": {
        "name": "tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_tasks",
        "module": "Tasks",
        "bean_name": "Task"
      },
      "notes": {
        "name": "notes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_notes",
        "module": "Notes",
        "bean_name": "Note"
      },
      "meetings": {
        "name": "meetings",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_meetings",
        "module": "Meetings",
        "bean_name": "Meeting"
      },
      "calls": {
        "name": "calls",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_calls",
        "module": "Calls",
        "bean_name": "Call"
      },
      "emails": {
        "name": "emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_accounts_rel",
        "module": "Emails",
        "bean_name": "Email"
      },
      "archived_emails": {
        "name": "archived_emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "",
        "module": "Emails",
        "bean_name": ""
      },
      "documents": {
        "name": "documents",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "documents_accounts",
        "module": "",
        "bean_name": ""
      },
      "bugs": {
        "name": "bugs",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_bugs",
        "module": "Bugs",
        "bean_name": "Bug"
      },
      "contacts": {
        "name": "contacts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_contacts",
        "module": "Contacts",
        "bean_name": "Contact"
      },
      "opportunities": {
        "name": "opportunities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_opportunities",
        "module": "Opportunities",
        "bean_name": "Opportunity"
      },
      "quotes": {
        "name": "quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quotes_billto_accounts",
        "module": "Quotes",
        "bean_name": "Quote"
      },
      "quotes_shipto": {
        "name": "quotes_shipto",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quotes_shipto_accounts",
        "module": "Quotes",
        "bean_name": "Quote"
      },
      "project": {
        "name": "project",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "projects_accounts",
        "module": "Project",
        "bean_name": "Project"
      },
      "leads": {
        "name": "leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_leads",
        "module": "Leads",
        "bean_name": "Lead"
      },
      "campaigns": {
        "name": "campaigns",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_campaign_log",
        "module": "CampaignLog",
        "bean_name": "CampaignLog"
      },
      "campaign_accounts": {
        "name": "campaign_accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "campaign_accounts",
        "module": "",
        "bean_name": ""
      },
      "revenuelineitems": {
        "name": "revenuelineitems",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "revenuelineitems_accounts",
        "module": "RevenueLineItems",
        "bean_name": "RevenueLineItem"
      },
      "forecastworksheets": {
        "name": "forecastworksheets",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "forecastworksheets_accounts",
        "module": "ForecastWorksheets",
        "bean_name": "ForecastWorksheet"
      },
      "products": {
        "name": "products",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "products_accounts",
        "module": "",
        "bean_name": ""
      },
      "contracts": {
        "name": "contracts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_contracts",
        "module": "",
        "bean_name": ""
      },
      "prospect_lists": {
        "name": "prospect_lists",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "prospect_list_accounts",
        "module": "ProspectLists",
        "bean_name": ""
      }
    }
  },
  "Contacts": {
    "module_name": "Contacts",
    "table_name": "contacts",
    "module_fields": {
      "my_favorite": {
        "name": "my_favorite",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Favorite",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "following": {
        "name": "following",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Following",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "name": {
        "name": "name",
        "type": "fullname",
        "group": "name",
        "id_name": "",
        "label": "Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "created_by_name",
        "id_name": "",
        "label": "Date Created",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "modified_by_name",
        "id_name": "",
        "label": "Date Modified:",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "doc_owner": {
        "name": "doc_owner",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Document Onwer",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "user_favorites": {
        "name": "user_favorites",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Users Who Favorite",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": "",
        "default_value": "0"
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned User",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "email": {
        "name": "email",
        "type": "email",
        "group": "email",
        "id_name": "",
        "label": "Email:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "email1": {
        "name": "email1",
        "type": "varchar",
        "group": "email",
        "id_name": "",
        "label": "Email Address:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email2": {
        "name": "email2",
        "type": "varchar",
        "group": "email",
        "id_name": "",
        "label": "Other Email:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "invalid_email": {
        "name": "invalid_email",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Invalid Email:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_opt_out": {
        "name": "email_opt_out",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Email Opt Out:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_addresses_non_primary": {
        "name": "email_addresses_non_primary",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Non-primary emails",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "salutation": {
        "name": "salutation",
        "type": "enum",
        "group": "name",
        "id_name": "",
        "label": "Salutation:",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Mr.": {
            "name": "Mr.",
            "value": "Mr."
          },
          "Ms.": {
            "name": "Ms.",
            "value": "Ms."
          },
          "Mrs.": {
            "name": "Mrs.",
            "value": "Mrs."
          },
          "Dr.": {
            "name": "Dr.",
            "value": "Dr."
          },
          "Prof.": {
            "name": "Prof.",
            "value": "Prof."
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "first_name": {
        "name": "first_name",
        "type": "varchar",
        "group": "name",
        "id_name": "",
        "label": "First Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "last_name": {
        "name": "last_name",
        "type": "varchar",
        "group": "name",
        "id_name": "",
        "label": "Last Name:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "full_name": {
        "name": "full_name",
        "type": "fullname",
        "group": "name",
        "id_name": "",
        "label": "Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "title": {
        "name": "title",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Title:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "facebook": {
        "name": "facebook",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Facebook Account",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "twitter": {
        "name": "twitter",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Twitter Account",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "googleplus": {
        "name": "googleplus",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Google Plus ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "department": {
        "name": "department",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Department:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "do_not_call": {
        "name": "do_not_call",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Do Not Call:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "phone_home": {
        "name": "phone_home",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Home:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_mobile": {
        "name": "phone_mobile",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Mobile:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_work": {
        "name": "phone_work",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Office Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_other": {
        "name": "phone_other",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Other Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_fax": {
        "name": "phone_fax",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Fax:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "primary_address_street": {
        "name": "primary_address_street",
        "type": "text",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Street:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "primary_address_street_2": {
        "name": "primary_address_street_2",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Street 2:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "primary_address_street_3": {
        "name": "primary_address_street_3",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Street 3:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "primary_address_city": {
        "name": "primary_address_city",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address City:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "primary_address_state": {
        "name": "primary_address_state",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address State:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "primary_address_postalcode": {
        "name": "primary_address_postalcode",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Postal Code:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "primary_address_country": {
        "name": "primary_address_country",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Country:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "alt_address_street": {
        "name": "alt_address_street",
        "type": "text",
        "group": "alt_address",
        "id_name": "",
        "label": "Alternate Address Street:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "alt_address_street_2": {
        "name": "alt_address_street_2",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alternate Address Street 2:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "alt_address_street_3": {
        "name": "alt_address_street_3",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alternate Address Street 3:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "alt_address_city": {
        "name": "alt_address_city",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alternate Address City:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "alt_address_state": {
        "name": "alt_address_state",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alternate Address State:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "alt_address_postalcode": {
        "name": "alt_address_postalcode",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alternate Address Postal Code:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "alt_address_country": {
        "name": "alt_address_country",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alternate Address Country:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "assistant": {
        "name": "assistant",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Assistant:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "75"
      },
      "assistant_phone": {
        "name": "assistant_phone",
        "type": "phone",
        "group": "assistant",
        "id_name": "",
        "label": "Assistant Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "picture": {
        "name": "picture",
        "type": "image",
        "group": "",
        "id_name": "",
        "label": "Avatar",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "email_and_name1": {
        "name": "email_and_name1",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "510"
      },
      "lead_source": {
        "name": "lead_source",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Lead Source:",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Cold Call": {
            "name": "Cold Call",
            "value": "Cold Call"
          },
          "Existing Customer": {
            "name": "Existing Customer",
            "value": "Existing Customer"
          },
          "Self Generated": {
            "name": "Self Generated",
            "value": "Self Generated"
          },
          "Employee": {
            "name": "Employee",
            "value": "Employee"
          },
          "Partner": {
            "name": "Partner",
            "value": "Partner"
          },
          "Public Relations": {
            "name": "Public Relations",
            "value": "Public Relations"
          },
          "Direct Mail": {
            "name": "Direct Mail",
            "value": "Direct Mail"
          },
          "Conference": {
            "name": "Conference",
            "value": "Conference"
          },
          "Trade Show": {
            "name": "Trade Show",
            "value": "Trade Show"
          },
          "Web Site": {
            "name": "Web Site",
            "value": "Web Site"
          },
          "Word of mouth": {
            "name": "Word of mouth",
            "value": "Word of mouth"
          },
          "Email": {
            "name": "Email",
            "value": "Email"
          },
          "Campaign": {
            "name": "Campaign",
            "value": "Campaign"
          },
          "Support Portal User Registration": {
            "name": "Support Portal User Registration",
            "value": "Support Portal User Registration"
          },
          "Other": {
            "name": "Other",
            "value": "Other"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "account_name": {
        "name": "account_name",
        "type": "relate",
        "group": "",
        "id_name": "account_id",
        "label": "Account Name:",
        "required": 0,
        "options": [],
        "related_module": "Accounts",
        "calculated": false,
        "len": "255"
      },
      "account_id": {
        "name": "account_id",
        "type": "relate",
        "group": "",
        "id_name": "account_id",
        "label": "Account ID:",
        "required": 0,
        "options": [],
        "related_module": "Accounts",
        "calculated": false,
        "len": ""
      },
      "dnb_principal_id": {
        "name": "dnb_principal_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "D&B Principal Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 30
      },
      "opportunity_role_fields": {
        "name": "opportunity_role_fields",
        "type": "relate",
        "group": "",
        "id_name": "",
        "label": "Account Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "opportunity_role_id": {
        "name": "opportunity_role_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Opportunity Role ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "opportunity_role": {
        "name": "opportunity_role",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Opportunity Role",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Primary Decision Maker": {
            "name": "Primary Decision Maker",
            "value": "Primary Decision Maker"
          },
          "Business Decision Maker": {
            "name": "Business Decision Maker",
            "value": "Business Decision Maker"
          },
          "Business Evaluator": {
            "name": "Business Evaluator",
            "value": "Business Evaluator"
          },
          "Technical Decision Maker": {
            "name": "Technical Decision Maker",
            "value": "Technical Decision Maker"
          },
          "Technical Evaluator": {
            "name": "Technical Evaluator",
            "value": "Technical Evaluator"
          },
          "Executive Sponsor": {
            "name": "Executive Sponsor",
            "value": "Executive Sponsor"
          },
          "Influencer": {
            "name": "Influencer",
            "value": "Influencer"
          },
          "Other": {
            "name": "Other",
            "value": "Other"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reports_to_id": {
        "name": "reports_to_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Reports to ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "report_to_name": {
        "name": "report_to_name",
        "type": "relate",
        "group": "",
        "id_name": "reports_to_id",
        "label": "Reports To:",
        "required": 0,
        "options": [],
        "related_module": "Contacts",
        "calculated": false,
        "len": "id"
      },
      "birthdate": {
        "name": "birthdate",
        "type": "date",
        "group": "",
        "id_name": "",
        "label": "Birthdate:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "portal_name": {
        "name": "portal_name",
        "type": "varchar",
        "group": "portal",
        "id_name": "",
        "label": "Portal Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "portal_active": {
        "name": "portal_active",
        "type": "bool",
        "group": "portal",
        "id_name": "",
        "label": "Portal Active:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "portal_password": {
        "name": "portal_password",
        "type": "password",
        "group": "portal",
        "id_name": "",
        "label": "Password:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "portal_password1": {
        "name": "portal_password1",
        "type": "password",
        "group": "portal",
        "id_name": "",
        "label": "Password:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "portal_app": {
        "name": "portal_app",
        "type": "varchar",
        "group": "portal",
        "id_name": "",
        "label": "Portal Application:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "preferred_language": {
        "name": "preferred_language",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Language Preference:",
        "required": 0,
        "options": {
          "en_us": {
            "name": "en_us",
            "value": "English (US)"
          },
          "bg_BG": {
            "name": "bg_BG",
            "value": "Български"
          },
          "cs_CZ": {
            "name": "cs_CZ",
            "value": "Česky"
          },
          "da_DK": {
            "name": "da_DK",
            "value": "Dansk"
          },
          "de_DE": {
            "name": "de_DE",
            "value": "Deutsch"
          },
          "el_EL": {
            "name": "el_EL",
            "value": "Ελληνικά"
          },
          "es_ES": {
            "name": "es_ES",
            "value": "Español"
          },
          "fr_FR": {
            "name": "fr_FR",
            "value": "Français"
          },
          "he_IL": {
            "name": "he_IL",
            "value": "עברית"
          },
          "hu_HU": {
            "name": "hu_HU",
            "value": "Magyar"
          },
          "it_it": {
            "name": "it_it",
            "value": "Italiano"
          },
          "lt_LT": {
            "name": "lt_LT",
            "value": "Lietuvių"
          },
          "ja_JP": {
            "name": "ja_JP",
            "value": "日本語"
          },
          "ko_KR": {
            "name": "ko_KR",
            "value": "한국어"
          },
          "lv_LV": {
            "name": "lv_LV",
            "value": "Latviešu"
          },
          "nb_NO": {
            "name": "nb_NO",
            "value": "Bokmål"
          },
          "nl_NL": {
            "name": "nl_NL",
            "value": "Nederlands"
          },
          "pl_PL": {
            "name": "pl_PL",
            "value": "Polski"
          },
          "pt_PT": {
            "name": "pt_PT",
            "value": "Português"
          },
          "ro_RO": {
            "name": "ro_RO",
            "value": "Română"
          },
          "ru_RU": {
            "name": "ru_RU",
            "value": "Русский"
          },
          "sv_SE": {
            "name": "sv_SE",
            "value": "Svenska"
          },
          "tr_TR": {
            "name": "tr_TR",
            "value": "Türkçe"
          },
          "zh_CN": {
            "name": "zh_CN",
            "value": "简体中文"
          },
          "pt_BR": {
            "name": "pt_BR",
            "value": "Português Brasileiro"
          },
          "ca_ES": {
            "name": "ca_ES",
            "value": "Català"
          },
          "en_UK": {
            "name": "en_UK",
            "value": "English (UK)"
          },
          "sr_RS": {
            "name": "sr_RS",
            "value": "Српски"
          },
          "sk_SK": {
            "name": "sk_SK",
            "value": "Slovenčina"
          },
          "sq_AL": {
            "name": "sq_AL",
            "value": "Shqip"
          },
          "et_EE": {
            "name": "et_EE",
            "value": "Eesti"
          },
          "es_LA": {
            "name": "es_LA",
            "value": "Español (Latinoamérica)"
          },
          "fi_FI": {
            "name": "fi_FI",
            "value": "Finnish"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "campaign_id": {
        "name": "campaign_id",
        "type": "id",
        "group": "",
        "id_name": "campaign_id",
        "label": "Campaign ID",
        "required": 0,
        "options": [],
        "related_module": "Campaigns",
        "calculated": false,
        "len": ""
      },
      "campaign_name": {
        "name": "campaign_name",
        "type": "relate",
        "group": "",
        "id_name": "campaign_id",
        "label": "Campaign:",
        "required": 0,
        "options": [],
        "related_module": "Campaigns",
        "calculated": false,
        "len": ""
      },
      "c_accept_status_fields": {
        "name": "c_accept_status_fields",
        "type": "relate",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "m_accept_status_fields": {
        "name": "m_accept_status_fields",
        "type": "relate",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_id": {
        "name": "accept_status_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_name": {
        "name": "accept_status_name",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_calls": {
        "name": "accept_status_calls",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_meetings": {
        "name": "accept_status_meetings",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "sync_contact": {
        "name": "sync_contact",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Sync to Mail Client:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "mkto_sync": {
        "name": "mkto_sync",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Sync to Marketo&reg;",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "mkto_id": {
        "name": "mkto_id",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Marketo Lead ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "mkto_lead_score": {
        "name": "mkto_lead_score",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Lead Score",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deptcat_c": {
        "name": "deptcat_c",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Campaign",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255",
        "default_value": ""
      }
    },
    "link_fields": {
      "favorite_link": {
        "name": "favorite_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_favorite",
        "module": "",
        "bean_name": ""
      },
      "following_link": {
        "name": "following_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_following",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_activities",
        "module": "Activities",
        "bean_name": "Activity"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "assigned_user_id",
        "relationship": "contacts_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_teams",
        "module": "",
        "bean_name": ""
      },
      "email_addresses_primary": {
        "name": "email_addresses_primary",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_email_addresses_primary",
        "module": "",
        "bean_name": ""
      },
      "email_addresses": {
        "name": "email_addresses",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_email_addresses",
        "module": "",
        "bean_name": ""
      },
      "accounts": {
        "name": "accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_contacts",
        "module": "",
        "bean_name": ""
      },
      "reports_to_link": {
        "name": "reports_to_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_direct_reports",
        "module": "",
        "bean_name": ""
      },
      "opportunities": {
        "name": "opportunities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_contacts",
        "module": "Opportunities",
        "bean_name": "Opportunity"
      },
      "bugs": {
        "name": "bugs",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_bugs",
        "module": "",
        "bean_name": ""
      },
      "calls": {
        "name": "calls",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_contacts",
        "module": "",
        "bean_name": ""
      },
      "cases": {
        "name": "cases",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_cases",
        "module": "",
        "bean_name": ""
      },
      "direct_reports": {
        "name": "direct_reports",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_direct_reports",
        "module": "",
        "bean_name": ""
      },
      "emails": {
        "name": "emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_contacts_rel",
        "module": "",
        "bean_name": ""
      },
      "archived_emails": {
        "name": "archived_emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "",
        "module": "Emails",
        "bean_name": ""
      },
      "documents": {
        "name": "documents",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "documents_contacts",
        "module": "",
        "bean_name": ""
      },
      "leads": {
        "name": "leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_leads",
        "module": "",
        "bean_name": ""
      },
      "products": {
        "name": "products",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_products",
        "module": "",
        "bean_name": ""
      },
      "contracts": {
        "name": "contracts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contracts_contacts",
        "module": "",
        "bean_name": ""
      },
      "meetings": {
        "name": "meetings",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_contacts",
        "module": "",
        "bean_name": ""
      },
      "notes": {
        "name": "notes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_notes",
        "module": "",
        "bean_name": ""
      },
      "project": {
        "name": "project",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "projects_contacts",
        "module": "",
        "bean_name": ""
      },
      "project_resource": {
        "name": "project_resource",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "projects_contacts_resources",
        "module": "",
        "bean_name": ""
      },
      "quotes": {
        "name": "quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quotes_contacts_shipto",
        "module": "Quotes",
        "bean_name": "Quote"
      },
      "billing_quotes": {
        "name": "billing_quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quotes_contacts_billto",
        "module": "Quotes",
        "bean_name": "Quote"
      },
      "tasks": {
        "name": "tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_tasks",
        "module": "",
        "bean_name": ""
      },
      "tasks_parent": {
        "name": "tasks_parent",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_tasks_parent",
        "module": "",
        "bean_name": ""
      },
      "all_tasks": {
        "name": "all_tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_tasks",
        "module": "",
        "bean_name": ""
      },
      "user_sync": {
        "name": "user_sync",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_users",
        "module": "",
        "bean_name": ""
      },
      "campaigns": {
        "name": "campaigns",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_campaign_log",
        "module": "CampaignLog",
        "bean_name": "CampaignLog"
      },
      "campaign_contacts": {
        "name": "campaign_contacts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "campaign_contacts",
        "module": "",
        "bean_name": ""
      },
      "prospect_lists": {
        "name": "prospect_lists",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "prospect_list_contacts",
        "module": "ProspectLists",
        "bean_name": ""
      }
    }
  },
  "EmailTemplates": {
    "module_name": "EmailTemplates",
    "table_name": "email_templates",
    "module_fields": {
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams:",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams:",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Date Created:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Date Modified:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "modified_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": "36"
      },
      "published": {
        "name": "published",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Published",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "3"
      },
      "name": {
        "name": "name",
        "type": "varchar",
        "group": "name",
        "id_name": "",
        "label": "Name:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "subject": {
        "name": "subject",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Subject:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "body": {
        "name": "body",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Body:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "body_html": {
        "name": "body_html",
        "type": "html",
        "group": "",
        "id_name": "",
        "label": "Plain Text",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned To",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "base_module": {
        "name": "base_module",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Base Module",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "from_name": {
        "name": "from_name",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "From Name",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "from_address": {
        "name": "from_address",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "From Address",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "text_only": {
        "name": "text_only",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Text Only",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "type": {
        "name": "type",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Type",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "campaign": {
            "name": "campaign",
            "value": "Campaign"
          },
          "email": {
            "name": "email",
            "value": "Email"
          },
          "workflow": {
            "name": "workflow",
            "value": "Workflow"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "modified_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": "36"
      }
    },
    "link_fields": {
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emailtemplates_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emailtemplates_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emailtemplates_teams",
        "module": "",
        "bean_name": ""
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "assigned_user_id",
        "relationship": "emailtemplates_assigned_user",
        "module": "Users",
        "bean_name": "User"
      }
    }
  },
  "Leads": {
    "module_name": "Leads",
    "table_name": "leads",
    "module_fields": {
      "my_favorite": {
        "name": "my_favorite",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Favorite",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "following": {
        "name": "following",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Following",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "name": {
        "name": "name",
        "type": "fullname",
        "group": "name",
        "id_name": "",
        "label": "Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "created_by_name",
        "id_name": "",
        "label": "Date Created",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "modified_by_name",
        "id_name": "",
        "label": "Date Modified",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "doc_owner": {
        "name": "doc_owner",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Document Onwer",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "user_favorites": {
        "name": "user_favorites",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Users Who Favorite",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": "",
        "default_value": "0"
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned User:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "email": {
        "name": "email",
        "type": "email",
        "group": "email",
        "id_name": "",
        "label": "Email:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "email1": {
        "name": "email1",
        "type": "varchar",
        "group": "email",
        "id_name": "",
        "label": "Email Address:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email2": {
        "name": "email2",
        "type": "varchar",
        "group": "email",
        "id_name": "",
        "label": "Other Email:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "invalid_email": {
        "name": "invalid_email",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Invalid Email:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_opt_out": {
        "name": "email_opt_out",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Email Opt Out:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_addresses_non_primary": {
        "name": "email_addresses_non_primary",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Non-primary emails",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "salutation": {
        "name": "salutation",
        "type": "enum",
        "group": "name",
        "id_name": "",
        "label": "Salutation",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Mr.": {
            "name": "Mr.",
            "value": "Mr."
          },
          "Ms.": {
            "name": "Ms.",
            "value": "Ms."
          },
          "Mrs.": {
            "name": "Mrs.",
            "value": "Mrs."
          },
          "Dr.": {
            "name": "Dr.",
            "value": "Dr."
          },
          "Prof.": {
            "name": "Prof.",
            "value": "Prof."
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "first_name": {
        "name": "first_name",
        "type": "varchar",
        "group": "name",
        "id_name": "",
        "label": "First Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "last_name": {
        "name": "last_name",
        "type": "varchar",
        "group": "name",
        "id_name": "",
        "label": "Last Name:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "full_name": {
        "name": "full_name",
        "type": "fullname",
        "group": "name",
        "id_name": "",
        "label": "Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "title": {
        "name": "title",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Title:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "facebook": {
        "name": "facebook",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Facebook Account",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "twitter": {
        "name": "twitter",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Twitter Account",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "googleplus": {
        "name": "googleplus",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Google Plus ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "department": {
        "name": "department",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Department:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "do_not_call": {
        "name": "do_not_call",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Do Not Call:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "phone_home": {
        "name": "phone_home",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Home Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_mobile": {
        "name": "phone_mobile",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Mobile:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_work": {
        "name": "phone_work",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Office Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_other": {
        "name": "phone_other",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Other Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "phone_fax": {
        "name": "phone_fax",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Fax:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "primary_address_street": {
        "name": "primary_address_street",
        "type": "text",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Street",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "primary_address_street_2": {
        "name": "primary_address_street_2",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Street 2",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "primary_address_street_3": {
        "name": "primary_address_street_3",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Street 3",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "primary_address_city": {
        "name": "primary_address_city",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address City",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "primary_address_state": {
        "name": "primary_address_state",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address State",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "primary_address_postalcode": {
        "name": "primary_address_postalcode",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Postal Code",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "primary_address_country": {
        "name": "primary_address_country",
        "type": "varchar",
        "group": "primary_address",
        "id_name": "",
        "label": "Primary Address Country",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "alt_address_street": {
        "name": "alt_address_street",
        "type": "text",
        "group": "alt_address",
        "id_name": "",
        "label": "Alt Address Street",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "alt_address_street_2": {
        "name": "alt_address_street_2",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alt Address Street 2",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "alt_address_street_3": {
        "name": "alt_address_street_3",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alt Address Street 3",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "alt_address_city": {
        "name": "alt_address_city",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alt Address City",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "alt_address_state": {
        "name": "alt_address_state",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alt Address State",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "alt_address_postalcode": {
        "name": "alt_address_postalcode",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alt Address Postal Code",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "alt_address_country": {
        "name": "alt_address_country",
        "type": "varchar",
        "group": "alt_address",
        "id_name": "",
        "label": "Alt Address Country",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "assistant": {
        "name": "assistant",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Assistant",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "75"
      },
      "assistant_phone": {
        "name": "assistant_phone",
        "type": "phone",
        "group": "assistant",
        "id_name": "",
        "label": "Assistant Phone",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "picture": {
        "name": "picture",
        "type": "image",
        "group": "",
        "id_name": "",
        "label": "Avatar",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "converted": {
        "name": "converted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Converted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "refered_by": {
        "name": "refered_by",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Referred By:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "lead_source": {
        "name": "lead_source",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Lead Source:",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Cold Call": {
            "name": "Cold Call",
            "value": "Cold Call"
          },
          "Existing Customer": {
            "name": "Existing Customer",
            "value": "Existing Customer"
          },
          "Self Generated": {
            "name": "Self Generated",
            "value": "Self Generated"
          },
          "Employee": {
            "name": "Employee",
            "value": "Employee"
          },
          "Partner": {
            "name": "Partner",
            "value": "Partner"
          },
          "Public Relations": {
            "name": "Public Relations",
            "value": "Public Relations"
          },
          "Direct Mail": {
            "name": "Direct Mail",
            "value": "Direct Mail"
          },
          "Conference": {
            "name": "Conference",
            "value": "Conference"
          },
          "Trade Show": {
            "name": "Trade Show",
            "value": "Trade Show"
          },
          "Web Site": {
            "name": "Web Site",
            "value": "Web Site"
          },
          "Word of mouth": {
            "name": "Word of mouth",
            "value": "Word of mouth"
          },
          "Email": {
            "name": "Email",
            "value": "Email"
          },
          "Campaign": {
            "name": "Campaign",
            "value": "Campaign"
          },
          "Support Portal User Registration": {
            "name": "Support Portal User Registration",
            "value": "Support Portal User Registration"
          },
          "Other": {
            "name": "Other",
            "value": "Other"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "lead_source_description": {
        "name": "lead_source_description",
        "type": "text",
        "group": "lead_source",
        "id_name": "",
        "label": "Lead Source Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "status": {
        "name": "status",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Status:",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "New": {
            "name": "New",
            "value": "New"
          },
          "Assigned": {
            "name": "Assigned",
            "value": "Assigned"
          },
          "In Process": {
            "name": "In Process",
            "value": "In Process"
          },
          "Converted": {
            "name": "Converted",
            "value": "Converted"
          },
          "Recycled": {
            "name": "Recycled",
            "value": "Recycled"
          },
          "Dead": {
            "name": "Dead",
            "value": "Dead"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "status_description": {
        "name": "status_description",
        "type": "text",
        "group": "status",
        "id_name": "",
        "label": "Status Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reports_to_id": {
        "name": "reports_to_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Reports To ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "report_to_name": {
        "name": "report_to_name",
        "type": "relate",
        "group": "",
        "id_name": "reports_to_id",
        "label": "Reports To:",
        "required": 0,
        "options": [],
        "related_module": "Contacts",
        "calculated": false,
        "len": "id"
      },
      "account_name": {
        "name": "account_name",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Account Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "account_description": {
        "name": "account_description",
        "type": "text",
        "group": "account_name",
        "id_name": "",
        "label": "Account Description",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_id": {
        "name": "contact_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Contact ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_name": {
        "name": "contact_name",
        "type": "relate",
        "group": "",
        "id_name": "contact_id",
        "label": "Lead Name:",
        "required": 0,
        "options": [],
        "related_module": "Contacts",
        "calculated": false,
        "len": "255"
      },
      "account_id": {
        "name": "account_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Account ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "opportunity_id": {
        "name": "opportunity_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Opportunity ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "opportunity_name": {
        "name": "opportunity_name",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Opportunity Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "opportunity_amount": {
        "name": "opportunity_amount",
        "type": "varchar",
        "group": "opportunity_name",
        "id_name": "",
        "label": "Opportunity Amount:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "campaign_id": {
        "name": "campaign_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Campaign ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "campaign_name": {
        "name": "campaign_name",
        "type": "relate",
        "group": "",
        "id_name": "campaign_id",
        "label": "Campaign:",
        "required": 0,
        "options": [],
        "related_module": "Campaigns",
        "calculated": false,
        "len": ""
      },
      "c_accept_status_fields": {
        "name": "c_accept_status_fields",
        "type": "relate",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "m_accept_status_fields": {
        "name": "m_accept_status_fields",
        "type": "relate",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_id": {
        "name": "accept_status_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_name": {
        "name": "accept_status_name",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_calls": {
        "name": "accept_status_calls",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_meetings": {
        "name": "accept_status_meetings",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "webtolead_email1": {
        "name": "webtolead_email1",
        "type": "email",
        "group": "",
        "id_name": "",
        "label": "Email Address:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "webtolead_email2": {
        "name": "webtolead_email2",
        "type": "email",
        "group": "",
        "id_name": "",
        "label": "Other Email:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "webtolead_email_opt_out": {
        "name": "webtolead_email_opt_out",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Email Opt Out:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "webtolead_invalid_email": {
        "name": "webtolead_invalid_email",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Invalid Email:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "birthdate": {
        "name": "birthdate",
        "type": "date",
        "group": "",
        "id_name": "",
        "label": "Birthdate:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "portal_name": {
        "name": "portal_name",
        "type": "varchar",
        "group": "portal",
        "id_name": "",
        "label": "Portal Name:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "portal_app": {
        "name": "portal_app",
        "type": "varchar",
        "group": "portal",
        "id_name": "",
        "label": "Portal Application",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "website": {
        "name": "website",
        "type": "url",
        "group": "",
        "id_name": "",
        "label": "Website",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 255
      },
      "preferred_language": {
        "name": "preferred_language",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Language Preference:",
        "required": 0,
        "options": {
          "en_us": {
            "name": "en_us",
            "value": "English (US)"
          },
          "bg_BG": {
            "name": "bg_BG",
            "value": "Български"
          },
          "cs_CZ": {
            "name": "cs_CZ",
            "value": "Česky"
          },
          "da_DK": {
            "name": "da_DK",
            "value": "Dansk"
          },
          "de_DE": {
            "name": "de_DE",
            "value": "Deutsch"
          },
          "el_EL": {
            "name": "el_EL",
            "value": "Ελληνικά"
          },
          "es_ES": {
            "name": "es_ES",
            "value": "Español"
          },
          "fr_FR": {
            "name": "fr_FR",
            "value": "Français"
          },
          "he_IL": {
            "name": "he_IL",
            "value": "עברית"
          },
          "hu_HU": {
            "name": "hu_HU",
            "value": "Magyar"
          },
          "it_it": {
            "name": "it_it",
            "value": "Italiano"
          },
          "lt_LT": {
            "name": "lt_LT",
            "value": "Lietuvių"
          },
          "ja_JP": {
            "name": "ja_JP",
            "value": "日本語"
          },
          "ko_KR": {
            "name": "ko_KR",
            "value": "한국어"
          },
          "lv_LV": {
            "name": "lv_LV",
            "value": "Latviešu"
          },
          "nb_NO": {
            "name": "nb_NO",
            "value": "Bokmål"
          },
          "nl_NL": {
            "name": "nl_NL",
            "value": "Nederlands"
          },
          "pl_PL": {
            "name": "pl_PL",
            "value": "Polski"
          },
          "pt_PT": {
            "name": "pt_PT",
            "value": "Português"
          },
          "ro_RO": {
            "name": "ro_RO",
            "value": "Română"
          },
          "ru_RU": {
            "name": "ru_RU",
            "value": "Русский"
          },
          "sv_SE": {
            "name": "sv_SE",
            "value": "Svenska"
          },
          "tr_TR": {
            "name": "tr_TR",
            "value": "Türkçe"
          },
          "zh_CN": {
            "name": "zh_CN",
            "value": "简体中文"
          },
          "pt_BR": {
            "name": "pt_BR",
            "value": "Português Brasileiro"
          },
          "ca_ES": {
            "name": "ca_ES",
            "value": "Català"
          },
          "en_UK": {
            "name": "en_UK",
            "value": "English (UK)"
          },
          "sr_RS": {
            "name": "sr_RS",
            "value": "Српски"
          },
          "sk_SK": {
            "name": "sk_SK",
            "value": "Slovenčina"
          },
          "sq_AL": {
            "name": "sq_AL",
            "value": "Shqip"
          },
          "et_EE": {
            "name": "et_EE",
            "value": "Eesti"
          },
          "es_LA": {
            "name": "es_LA",
            "value": "Español (Latinoamérica)"
          },
          "fi_FI": {
            "name": "fi_FI",
            "value": "Finnish"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "mkto_sync": {
        "name": "mkto_sync",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Sync to Marketo&reg;",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "mkto_id": {
        "name": "mkto_id",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Marketo Lead ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "mkto_lead_score": {
        "name": "mkto_lead_score",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Lead Score",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      }
    },
    "link_fields": {
      "favorite_link": {
        "name": "favorite_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_favorite",
        "module": "",
        "bean_name": ""
      },
      "following_link": {
        "name": "following_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_following",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_activities",
        "module": "Activities",
        "bean_name": "Activity"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "assigned_user_id",
        "relationship": "leads_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_teams",
        "module": "",
        "bean_name": ""
      },
      "email_addresses_primary": {
        "name": "email_addresses_primary",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_email_addresses_primary",
        "module": "",
        "bean_name": ""
      },
      "email_addresses": {
        "name": "email_addresses",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "leads_email_addresses",
        "module": "",
        "bean_name": ""
      },
      "reports_to_link": {
        "name": "reports_to_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_direct_reports",
        "module": "",
        "bean_name": ""
      },
      "reportees": {
        "name": "reportees",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_direct_reports",
        "module": "",
        "bean_name": ""
      },
      "contacts": {
        "name": "contacts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_leads",
        "module": "Contacts",
        "bean_name": ""
      },
      "accounts": {
        "name": "accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_leads",
        "module": "",
        "bean_name": ""
      },
      "contact": {
        "name": "contact",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_leads",
        "module": "Contacts",
        "bean_name": ""
      },
      "opportunity": {
        "name": "opportunity",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_leads",
        "module": "",
        "bean_name": ""
      },
      "campaign_leads": {
        "name": "campaign_leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "campaign_leads",
        "module": "",
        "bean_name": ""
      },
      "tasks": {
        "name": "tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_tasks",
        "module": "",
        "bean_name": ""
      },
      "notes": {
        "name": "notes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_notes",
        "module": "",
        "bean_name": ""
      },
      "meetings": {
        "name": "meetings",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_leads",
        "module": "",
        "bean_name": ""
      },
      "calls": {
        "name": "calls",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_leads",
        "module": "",
        "bean_name": ""
      },
      "oldmeetings": {
        "name": "oldmeetings",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_meetings",
        "module": "",
        "bean_name": ""
      },
      "oldcalls": {
        "name": "oldcalls",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_calls",
        "module": "",
        "bean_name": ""
      },
      "emails": {
        "name": "emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_leads_rel",
        "module": "",
        "bean_name": ""
      },
      "archived_emails": {
        "name": "archived_emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "",
        "module": "Emails",
        "bean_name": ""
      },
      "campaigns": {
        "name": "campaigns",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_campaign_log",
        "module": "CampaignLog",
        "bean_name": "CampaignLog"
      },
      "prospect_lists": {
        "name": "prospect_lists",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "prospect_list_leads",
        "module": "ProspectLists",
        "bean_name": ""
      }
    }
  },
  "Notes": {
    "module_name": "Notes",
    "table_name": "notes",
    "module_fields": {
      "my_favorite": {
        "name": "my_favorite",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Favorite",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "following": {
        "name": "following",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Following",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "name": {
        "name": "name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "Subject:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "created_by_name",
        "id_name": "",
        "label": "Date Created",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "modified_by_name",
        "id_name": "",
        "label": "Date Modified",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "doc_owner": {
        "name": "doc_owner",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Document Onwer",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "user_favorites": {
        "name": "user_favorites",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Users Who Favorite",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": "",
        "default_value": "0"
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned User Id",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "file_mime_type": {
        "name": "file_mime_type",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Mime Type",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "file_url": {
        "name": "file_url",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "File URL",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "filename": {
        "name": "filename",
        "type": "file",
        "group": "",
        "id_name": "",
        "label": "Attachment:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "parent_type": {
        "name": "parent_type",
        "type": "parent_type",
        "group": "parent_name",
        "id_name": "",
        "label": "Parent Type",
        "required": 0,
        "options": {
          "Accounts": {
            "name": "Accounts",
            "value": "Account"
          },
          "Contacts": {
            "name": "Contacts",
            "value": "Contact"
          },
          "Tasks": {
            "name": "Tasks",
            "value": "Task"
          },
          "Opportunities": {
            "name": "Opportunities",
            "value": "Opportunity"
          },
          "RevenueLineItems": {
            "name": "RevenueLineItems",
            "value": "Revenue Line Item"
          },
          "Products": {
            "name": "Products",
            "value": "Quoted Line Item"
          },
          "Quotes": {
            "name": "Quotes",
            "value": "Quote"
          },
          "Bugs": {
            "name": "Bugs",
            "value": "Bugs"
          },
          "Cases": {
            "name": "Cases",
            "value": "Case"
          },
          "Leads": {
            "name": "Leads",
            "value": "Lead"
          },
          "Prospects": {
            "name": "Prospects",
            "value": "Target"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "parent_id": {
        "name": "parent_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Parent ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_id": {
        "name": "contact_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Contact ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "portal_flag": {
        "name": "portal_flag",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Display in Portal?",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "embed_flag": {
        "name": "embed_flag",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Embed in email?",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": 0
      },
      "parent_name": {
        "name": "parent_name",
        "type": "parent",
        "group": "",
        "id_name": "parent_id",
        "label": "Related To:",
        "required": 0,
        "options": {
          "Accounts": {
            "name": "Accounts",
            "value": "Account"
          },
          "Contacts": {
            "name": "Contacts",
            "value": "Contact"
          },
          "Opportunities": {
            "name": "Opportunities",
            "value": "Opportunity"
          },
          "Tasks": {
            "name": "Tasks",
            "value": "Task"
          },
          "ProductTemplates": {
            "name": "ProductTemplates",
            "value": "Product Catalog"
          },
          "Quotes": {
            "name": "Quotes",
            "value": "Quote"
          },
          "Products": {
            "name": "Products",
            "value": "Quoted Line Item"
          },
          "Contracts": {
            "name": "Contracts",
            "value": "Contract"
          },
          "RevenueLineItems": {
            "name": "RevenueLineItems",
            "value": "Revenue Line Item"
          },
          "Emails": {
            "name": "Emails",
            "value": "Email"
          },
          "Bugs": {
            "name": "Bugs",
            "value": "Bug"
          },
          "Prospects": {
            "name": "Prospects",
            "value": "Target"
          },
          "Cases": {
            "name": "Cases",
            "value": "Case"
          },
          "Leads": {
            "name": "Leads",
            "value": "Lead"
          },
          "Meetings": {
            "name": "Meetings",
            "value": "Meeting"
          },
          "Calls": {
            "name": "Calls",
            "value": "Call"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "type_name": "parent_type"
      },
      "contact_name": {
        "name": "contact_name",
        "type": "relate",
        "group": "",
        "id_name": "contact_id",
        "label": "Contact:",
        "required": 0,
        "options": [],
        "related_module": "Contacts",
        "calculated": false,
        "len": ""
      },
      "contact_phone": {
        "name": "contact_phone",
        "type": "phone",
        "group": "",
        "id_name": "",
        "label": "Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_email": {
        "name": "contact_email",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Email Address:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "account_id": {
        "name": "account_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Account ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "opportunity_id": {
        "name": "opportunity_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Opportunity ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "acase_id": {
        "name": "acase_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Case ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "lead_id": {
        "name": "lead_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Lead ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "product_id": {
        "name": "product_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Quoted Line Item ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "quote_id": {
        "name": "quote_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Quote ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      }
    },
    "link_fields": {
      "favorite_link": {
        "name": "favorite_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "notes_favorite",
        "module": "",
        "bean_name": ""
      },
      "following_link": {
        "name": "following_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "notes_following",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "notes_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "notes_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "note_activities",
        "module": "Activities",
        "bean_name": "Activity"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "assigned_user_id",
        "relationship": "notes_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "notes_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "notes_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "notes_teams",
        "module": "",
        "bean_name": ""
      },
      "contact": {
        "name": "contact",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_notes",
        "module": "Contacts",
        "bean_name": ""
      },
      "cases": {
        "name": "cases",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "case_notes",
        "module": "",
        "bean_name": ""
      },
      "accounts": {
        "name": "accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_notes",
        "module": "",
        "bean_name": ""
      },
      "opportunities": {
        "name": "opportunities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_notes",
        "module": "",
        "bean_name": ""
      },
      "leads": {
        "name": "leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_notes",
        "module": "",
        "bean_name": ""
      },
      "products": {
        "name": "products",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "product_notes",
        "module": "",
        "bean_name": ""
      },
      "revenuelineitems": {
        "name": "revenuelineitems",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "revenuelineitem_notes",
        "module": "",
        "bean_name": ""
      },
      "quotes": {
        "name": "quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quote_notes",
        "module": "",
        "bean_name": ""
      },
      "contracts": {
        "name": "contracts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contract_notes",
        "module": "",
        "bean_name": ""
      },
      "prospects": {
        "name": "prospects",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "prospect_notes",
        "module": "",
        "bean_name": ""
      },
      "bugs": {
        "name": "bugs",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "bug_notes",
        "module": "",
        "bean_name": ""
      },
      "emails": {
        "name": "emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_notes_rel",
        "module": "",
        "bean_name": ""
      },
      "projects": {
        "name": "projects",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "projects_notes",
        "module": "",
        "bean_name": ""
      },
      "project_tasks": {
        "name": "project_tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "project_tasks_notes",
        "module": "",
        "bean_name": ""
      },
      "meetings": {
        "name": "meetings",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_notes",
        "module": "",
        "bean_name": ""
      },
      "calls": {
        "name": "calls",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_notes",
        "module": "",
        "bean_name": ""
      },
      "tasks": {
        "name": "tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_notes",
        "module": "",
        "bean_name": ""
      }
    }
  },
  "Tasks": {
    "module_name": "Tasks",
    "table_name": "tasks",
    "module_fields": {
      "my_favorite": {
        "name": "my_favorite",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Favorite",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "following": {
        "name": "following",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Following",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "name": {
        "name": "name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "Subject:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "created_by_name",
        "id_name": "",
        "label": "Date Created",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "modified_by_name",
        "id_name": "",
        "label": "Date Modified",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "doc_owner": {
        "name": "doc_owner",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Document Onwer",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "user_favorites": {
        "name": "user_favorites",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Users Who Favorite",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": "",
        "default_value": "0"
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned User Id",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "status": {
        "name": "status",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Status:",
        "required": 1,
        "options": {
          "Not Started": {
            "name": "Not Started",
            "value": "Not Started"
          },
          "In Progress": {
            "name": "In Progress",
            "value": "In Progress"
          },
          "Completed": {
            "name": "Completed",
            "value": "Completed"
          },
          "Pending Input": {
            "name": "Pending Input",
            "value": "Pending Input"
          },
          "Deferred": {
            "name": "Deferred",
            "value": "Deferred"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100,
        "default_value": "Not Started"
      },
      "date_due_flag": {
        "name": "date_due_flag",
        "type": "bool",
        "group": "date_due",
        "id_name": "",
        "label": "No Due Date",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": 0
      },
      "date_due": {
        "name": "date_due",
        "type": "datetimecombo",
        "group": "date_due",
        "id_name": "",
        "label": "Due Date:",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "time_due": {
        "name": "time_due",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Due Time:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "date_start_flag": {
        "name": "date_start_flag",
        "type": "bool",
        "group": "date_start",
        "id_name": "",
        "label": "No Start Date",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": 0
      },
      "date_start": {
        "name": "date_start",
        "type": "datetimecombo",
        "group": "date_start",
        "id_name": "",
        "label": "Start Date:",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "parent_type": {
        "name": "parent_type",
        "type": "parent_type",
        "group": "parent_name",
        "id_name": "",
        "label": "Parent Type:",
        "required": 0,
        "options": {
          "Accounts": {
            "name": "Accounts",
            "value": "Account"
          },
          "Contacts": {
            "name": "Contacts",
            "value": "Contact"
          },
          "Tasks": {
            "name": "Tasks",
            "value": "Task"
          },
          "Opportunities": {
            "name": "Opportunities",
            "value": "Opportunity"
          },
          "RevenueLineItems": {
            "name": "RevenueLineItems",
            "value": "Revenue Line Item"
          },
          "Products": {
            "name": "Products",
            "value": "Quoted Line Item"
          },
          "Quotes": {
            "name": "Quotes",
            "value": "Quote"
          },
          "Bugs": {
            "name": "Bugs",
            "value": "Bugs"
          },
          "Cases": {
            "name": "Cases",
            "value": "Case"
          },
          "Leads": {
            "name": "Leads",
            "value": "Lead"
          },
          "Prospects": {
            "name": "Prospects",
            "value": "Target"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "parent_name": {
        "name": "parent_name",
        "type": "parent",
        "group": "parent_name",
        "id_name": "parent_id",
        "label": "Related to",
        "required": 0,
        "options": {
          "Accounts": {
            "name": "Accounts",
            "value": "Account"
          },
          "Contacts": {
            "name": "Contacts",
            "value": "Contact"
          },
          "Tasks": {
            "name": "Tasks",
            "value": "Task"
          },
          "Opportunities": {
            "name": "Opportunities",
            "value": "Opportunity"
          },
          "RevenueLineItems": {
            "name": "RevenueLineItems",
            "value": "Revenue Line Item"
          },
          "Products": {
            "name": "Products",
            "value": "Quoted Line Item"
          },
          "Quotes": {
            "name": "Quotes",
            "value": "Quote"
          },
          "Bugs": {
            "name": "Bugs",
            "value": "Bugs"
          },
          "Cases": {
            "name": "Cases",
            "value": "Case"
          },
          "Leads": {
            "name": "Leads",
            "value": "Lead"
          },
          "Prospects": {
            "name": "Prospects",
            "value": "Target"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "type_name": "parent_type"
      },
      "parent_id": {
        "name": "parent_id",
        "type": "id",
        "group": "parent_name",
        "id_name": "",
        "label": "Parent ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_id": {
        "name": "contact_id",
        "type": "id",
        "group": "contact_name",
        "id_name": "",
        "label": "Contact ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_name": {
        "name": "contact_name",
        "type": "relate",
        "group": "contact_name",
        "id_name": "contact_id",
        "label": "Contact Name ",
        "required": 0,
        "options": [],
        "related_module": "Contacts",
        "calculated": false,
        "len": "510"
      },
      "contact_phone": {
        "name": "contact_phone",
        "type": "phone",
        "group": "",
        "id_name": "",
        "label": "Contact Phone:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_email": {
        "name": "contact_email",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Email Address:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "priority": {
        "name": "priority",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Priority:",
        "required": 1,
        "options": {
          "High": {
            "name": "High",
            "value": "High"
          },
          "Medium": {
            "name": "Medium",
            "value": "Medium"
          },
          "Low": {
            "name": "Low",
            "value": "Low"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      }
    },
    "link_fields": {
      "favorite_link": {
        "name": "favorite_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_favorite",
        "module": "",
        "bean_name": ""
      },
      "following_link": {
        "name": "following_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_following",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "task_activities",
        "module": "Activities",
        "bean_name": "Activity"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "assigned_user_id",
        "relationship": "tasks_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_teams",
        "module": "",
        "bean_name": ""
      },
      "contacts": {
        "name": "contacts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_tasks",
        "module": "",
        "bean_name": ""
      },
      "accounts": {
        "name": "accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_tasks",
        "module": "",
        "bean_name": ""
      },
      "opportunities": {
        "name": "opportunities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_tasks",
        "module": "",
        "bean_name": ""
      },
      "revenuelineitems": {
        "name": "revenuelineitems",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "revenuelineitem_tasks",
        "module": "",
        "bean_name": ""
      },
      "cases": {
        "name": "cases",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "case_tasks",
        "module": "",
        "bean_name": ""
      },
      "bugs": {
        "name": "bugs",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "bug_tasks",
        "module": "",
        "bean_name": ""
      },
      "leads": {
        "name": "leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "lead_tasks",
        "module": "",
        "bean_name": ""
      },
      "projects": {
        "name": "projects",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "projects_tasks",
        "module": "",
        "bean_name": ""
      },
      "project_tasks": {
        "name": "project_tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "project_tasks_tasks",
        "module": "",
        "bean_name": ""
      },
      "notes": {
        "name": "notes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "tasks_notes",
        "module": "Notes",
        "bean_name": "Note"
      },
      "quotes": {
        "name": "quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quote_tasks",
        "module": "",
        "bean_name": ""
      },
      "contact_parent": {
        "name": "contact_parent",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contact_tasks_parent",
        "module": "",
        "bean_name": ""
      }
    }
  },
  "Meetings": {
    "module_name": "Meetings",
    "table_name": "meetings",
    "module_fields": {
      "my_favorite": {
        "name": "my_favorite",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Favorite",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "following": {
        "name": "following",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Following",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "name": {
        "name": "name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "Subject:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "created_by_name",
        "id_name": "",
        "label": "Date Created",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "modified_by_name",
        "id_name": "",
        "label": "Date Modified",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "doc_owner": {
        "name": "doc_owner",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Document Onwer",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "user_favorites": {
        "name": "user_favorites",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Users Who Favorite",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": "",
        "default_value": "0"
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned User Id",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "accept_status": {
        "name": "accept_status",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "set_accept_links": {
        "name": "set_accept_links",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Accept Link",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "location": {
        "name": "location",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Location:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "password": {
        "name": "password",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Meeting Password",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "join_url": {
        "name": "join_url",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Start/Join Meeting",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "200"
      },
      "host_url": {
        "name": "host_url",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Host URL",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "400"
      },
      "displayed_url": {
        "name": "displayed_url",
        "type": "url",
        "group": "",
        "id_name": "",
        "label": "Display URL",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "400"
      },
      "creator": {
        "name": "creator",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Meeting Creator",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "external_id": {
        "name": "external_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "External App ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "duration_hours": {
        "name": "duration_hours",
        "type": "int",
        "group": "duration",
        "id_name": "",
        "label": "Duration Hours:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "3"
      },
      "duration_minutes": {
        "name": "duration_minutes",
        "type": "enum",
        "group": "duration",
        "id_name": "",
        "label": "Duration Minutes:",
        "required": 1,
        "options": {
          "0": {
            "name": 0,
            "value": "00"
          },
          "15": {
            "name": 15,
            "value": "15"
          },
          "30": {
            "name": 30,
            "value": "30"
          },
          "45": {
            "name": 45,
            "value": "45"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "2"
      },
      "date_start": {
        "name": "date_start",
        "type": "datetimecombo",
        "group": "",
        "id_name": "",
        "label": "Start Date:",
        "required": 1,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "date_end": {
        "name": "date_end",
        "type": "datetimecombo",
        "group": "",
        "id_name": "",
        "label": "End Date",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "parent_type": {
        "name": "parent_type",
        "type": "parent_type",
        "group": "parent_name",
        "id_name": "",
        "label": "Parent Type",
        "required": 0,
        "options": {
          "Accounts": {
            "name": "Accounts",
            "value": "Account"
          },
          "Contacts": {
            "name": "Contacts",
            "value": "Contact"
          },
          "Tasks": {
            "name": "Tasks",
            "value": "Task"
          },
          "Opportunities": {
            "name": "Opportunities",
            "value": "Opportunity"
          },
          "RevenueLineItems": {
            "name": "RevenueLineItems",
            "value": "Revenue Line Item"
          },
          "Products": {
            "name": "Products",
            "value": "Quoted Line Item"
          },
          "Quotes": {
            "name": "Quotes",
            "value": "Quote"
          },
          "Bugs": {
            "name": "Bugs",
            "value": "Bugs"
          },
          "Cases": {
            "name": "Cases",
            "value": "Case"
          },
          "Leads": {
            "name": "Leads",
            "value": "Lead"
          },
          "Prospects": {
            "name": "Prospects",
            "value": "Target"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "status": {
        "name": "status",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Status:",
        "required": 0,
        "options": {
          "Planned": {
            "name": "Planned",
            "value": "Planned"
          },
          "Held": {
            "name": "Held",
            "value": "Held"
          },
          "Not Held": {
            "name": "Not Held",
            "value": "Not Held"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100,
        "default_value": "Planned"
      },
      "type": {
        "name": "type",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Meeting Type",
        "required": 0,
        "options": {
          "Sugar": {
            "name": "Sugar",
            "value": "Sugar"
          },
          "WebEx": {
            "name": "WebEx",
            "value": "WebEx"
          },
          "GoToMeeting": {
            "name": "GoToMeeting",
            "value": "GoToMeeting"
          },
          "IBMSmartCloud": {
            "name": "IBMSmartCloud",
            "value": "IBM SmartCloud"
          },
          "Google": {
            "name": "Google",
            "value": "Google"
          },
          "Box": {
            "name": "Box",
            "value": "Box.net"
          },
          "Facebook": {
            "name": "Facebook",
            "value": "Facebook"
          },
          "Twitter": {
            "name": "Twitter",
            "value": "Twitter"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 255,
        "default_value": "Sugar"
      },
      "direction": {
        "name": "direction",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Direction:",
        "required": 0,
        "options": {
          "Inbound": {
            "name": "Inbound",
            "value": "Inbound"
          },
          "Outbound": {
            "name": "Outbound",
            "value": "Outbound"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "parent_id": {
        "name": "parent_id",
        "type": "id",
        "group": "parent_name",
        "id_name": "",
        "label": "Parent ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reminder_checked": {
        "name": "reminder_checked",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Reminders:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reminder_time": {
        "name": "reminder_time",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Reminder Time",
        "required": 0,
        "options": {
          "60": {
            "name": 60,
            "value": "1 minute prior"
          },
          "300": {
            "name": 300,
            "value": "5 minutes prior"
          },
          "600": {
            "name": 600,
            "value": "10 minutes prior"
          },
          "900": {
            "name": 900,
            "value": "15 minutes prior"
          },
          "1800": {
            "name": 1800,
            "value": "30 minutes prior"
          },
          "3600": {
            "name": 3600,
            "value": "1 hour prior"
          },
          "7200": {
            "name": 7200,
            "value": "2 hours prior"
          },
          "10800": {
            "name": 10800,
            "value": "3 hours prior"
          },
          "18000": {
            "name": 18000,
            "value": "5 hours prior"
          },
          "86400": {
            "name": 86400,
            "value": "1 day prior"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": -1
      },
      "email_reminder_checked": {
        "name": "email_reminder_checked",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Email Reminder",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_reminder_time": {
        "name": "email_reminder_time",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Email Reminder Time",
        "required": 0,
        "options": {
          "60": {
            "name": 60,
            "value": "1 minute prior"
          },
          "300": {
            "name": 300,
            "value": "5 minutes prior"
          },
          "600": {
            "name": 600,
            "value": "10 minutes prior"
          },
          "900": {
            "name": 900,
            "value": "15 minutes prior"
          },
          "1800": {
            "name": 1800,
            "value": "30 minutes prior"
          },
          "3600": {
            "name": 3600,
            "value": "1 hour prior"
          },
          "7200": {
            "name": 7200,
            "value": "2 hours prior"
          },
          "10800": {
            "name": 10800,
            "value": "3 hours prior"
          },
          "18000": {
            "name": 18000,
            "value": "5 hours prior"
          },
          "86400": {
            "name": 86400,
            "value": "1 day prior"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": -1
      },
      "email_reminder_sent": {
        "name": "email_reminder_sent",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Email reminder sent",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": 0
      },
      "outlook_id": {
        "name": "outlook_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Outlook ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "sequence": {
        "name": "sequence",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Meeting update sequence",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "11",
        "default_value": 0
      },
      "contact_name": {
        "name": "contact_name",
        "type": "relate",
        "group": "",
        "id_name": "contact_id",
        "label": "Contact:",
        "required": 0,
        "options": [],
        "related_module": "Contacts",
        "calculated": false,
        "len": 36
      },
      "parent_name": {
        "name": "parent_name",
        "type": "parent",
        "group": "parent_name",
        "id_name": "parent_id",
        "label": "Related to",
        "required": 0,
        "options": {
          "Accounts": {
            "name": "Accounts",
            "value": "Account"
          },
          "Contacts": {
            "name": "Contacts",
            "value": "Contact"
          },
          "Tasks": {
            "name": "Tasks",
            "value": "Task"
          },
          "Opportunities": {
            "name": "Opportunities",
            "value": "Opportunity"
          },
          "RevenueLineItems": {
            "name": "RevenueLineItems",
            "value": "Revenue Line Item"
          },
          "Products": {
            "name": "Products",
            "value": "Quoted Line Item"
          },
          "Quotes": {
            "name": "Quotes",
            "value": "Quote"
          },
          "Bugs": {
            "name": "Bugs",
            "value": "Bugs"
          },
          "Cases": {
            "name": "Cases",
            "value": "Case"
          },
          "Leads": {
            "name": "Leads",
            "value": "Lead"
          },
          "Prospects": {
            "name": "Prospects",
            "value": "Target"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "type_name": "parent_type"
      },
      "accept_status_users": {
        "name": "accept_status_users",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_id": {
        "name": "contact_id",
        "type": "relate",
        "group": "",
        "id_name": "",
        "label": "contact_id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "repeat_type": {
        "name": "repeat_type",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Repeat",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": "None"
          },
          "Daily": {
            "name": "Daily",
            "value": "Daily"
          },
          "Weekly": {
            "name": "Weekly",
            "value": "Weekly"
          },
          "Monthly": {
            "name": "Monthly",
            "value": "Monthly"
          },
          "Yearly": {
            "name": "Yearly",
            "value": "Yearly"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 36
      },
      "repeat_interval": {
        "name": "repeat_interval",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Every",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 3,
        "default_value": 1
      },
      "repeat_dow": {
        "name": "repeat_dow",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "On",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 7
      },
      "repeat_until": {
        "name": "repeat_until",
        "type": "date",
        "group": "",
        "id_name": "",
        "label": "Repeat Until",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "repeat_count": {
        "name": "repeat_count",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Number of recurrences",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 7
      },
      "repeat_parent_id": {
        "name": "repeat_parent_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Repeat Parent ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 36
      },
      "recurring_source": {
        "name": "recurring_source",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Recurring Source",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 36
      },
      "duration": {
        "name": "duration",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Duration:",
        "required": 0,
        "options": {
          "900": {
            "name": 900,
            "value": "15 minutes"
          },
          "1800": {
            "name": 1800,
            "value": "30 minutes"
          },
          "2700": {
            "name": 2700,
            "value": "45 minutes"
          },
          "3600": {
            "name": 3600,
            "value": "1 hour"
          },
          "5400": {
            "name": 5400,
            "value": "1.5 hours"
          },
          "7200": {
            "name": 7200,
            "value": "2 hours"
          },
          "10800": {
            "name": 10800,
            "value": "3 hours"
          },
          "21600": {
            "name": 21600,
            "value": "6 hours"
          },
          "86400": {
            "name": 86400,
            "value": "1 day"
          },
          "172800": {
            "name": 172800,
            "value": "2 days"
          },
          "259200": {
            "name": 259200,
            "value": "3 days"
          },
          "604800": {
            "name": 604800,
            "value": "1 week"
          },
          "": {
            "name": "",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "send_invites": {
        "name": "send_invites",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Send Invites",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      }
    },
    "link_fields": {
      "favorite_link": {
        "name": "favorite_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_favorite",
        "module": "",
        "bean_name": ""
      },
      "following_link": {
        "name": "following_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_following",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meeting_activities",
        "module": "Activities",
        "bean_name": "Activity"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "assigned_user_id",
        "relationship": "meetings_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_teams",
        "module": "",
        "bean_name": ""
      },
      "contacts": {
        "name": "contacts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_contacts",
        "module": "",
        "bean_name": ""
      },
      "users": {
        "name": "users",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_users",
        "module": "",
        "bean_name": ""
      },
      "accounts": {
        "name": "accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_meetings",
        "module": "",
        "bean_name": ""
      },
      "revenuelineitems": {
        "name": "revenuelineitems",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "revenuelineitem_meetings",
        "module": "RevenueLineItems",
        "bean_name": "RevenueLineItem"
      },
      "products": {
        "name": "products",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "product_meetings",
        "module": "Products",
        "bean_name": "Product"
      },
      "bugs": {
        "name": "bugs",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "bug_meetings",
        "module": "Bugs",
        "bean_name": ""
      },
      "leads": {
        "name": "leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_leads",
        "module": "",
        "bean_name": ""
      },
      "opportunity": {
        "name": "opportunity",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_meetings",
        "module": "",
        "bean_name": ""
      },
      "prospects": {
        "name": "prospects",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "prospect_meetings",
        "module": "Prospects",
        "bean_name": ""
      },
      "quotes": {
        "name": "quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quote_meetings",
        "module": "",
        "bean_name": ""
      },
      "cases": {
        "name": "cases",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "case_meetings",
        "module": "",
        "bean_name": ""
      },
      "notes": {
        "name": "notes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_notes",
        "module": "Notes",
        "bean_name": "Note"
      }
    }
  },
  "Calls": {
    "module_name": "Calls",
    "table_name": "calls",
    "module_fields": {
      "my_favorite": {
        "name": "my_favorite",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Favorite",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "following": {
        "name": "following",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Following",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "name": {
        "name": "name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "Subject:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "created_by_name",
        "id_name": "",
        "label": "Date Created",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "modified_by_name",
        "id_name": "",
        "label": "Date Modified",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "doc_owner": {
        "name": "doc_owner",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Document Onwer",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "user_favorites": {
        "name": "user_favorites",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Users Who Favorite",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": "",
        "default_value": "0"
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned User",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "duration_hours": {
        "name": "duration_hours",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Duration Hours:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "2"
      },
      "duration_minutes": {
        "name": "duration_minutes",
        "type": "int",
        "group": "duration_hours",
        "id_name": "",
        "label": "Duration Minutes:",
        "required": 0,
        "options": {
          "0": {
            "name": 0,
            "value": "00"
          },
          "15": {
            "name": 15,
            "value": "15"
          },
          "30": {
            "name": 30,
            "value": "30"
          },
          "45": {
            "name": 45,
            "value": "45"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "2"
      },
      "date_start": {
        "name": "date_start",
        "type": "datetimecombo",
        "group": "",
        "id_name": "",
        "label": "Start Date:",
        "required": 1,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "date_end": {
        "name": "date_end",
        "type": "datetimecombo",
        "group": "",
        "id_name": "",
        "label": "End Date",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "parent_type": {
        "name": "parent_type",
        "type": "parent_type",
        "group": "parent_name",
        "id_name": "",
        "label": "Parent Type",
        "required": 0,
        "options": {
          "Accounts": {
            "name": "Accounts",
            "value": "Account"
          },
          "Contacts": {
            "name": "Contacts",
            "value": "Contact"
          },
          "Tasks": {
            "name": "Tasks",
            "value": "Task"
          },
          "Opportunities": {
            "name": "Opportunities",
            "value": "Opportunity"
          },
          "RevenueLineItems": {
            "name": "RevenueLineItems",
            "value": "Revenue Line Item"
          },
          "Products": {
            "name": "Products",
            "value": "Quoted Line Item"
          },
          "Quotes": {
            "name": "Quotes",
            "value": "Quote"
          },
          "Bugs": {
            "name": "Bugs",
            "value": "Bugs"
          },
          "Cases": {
            "name": "Cases",
            "value": "Case"
          },
          "Leads": {
            "name": "Leads",
            "value": "Lead"
          },
          "Prospects": {
            "name": "Prospects",
            "value": "Target"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 255
      },
      "parent_name": {
        "name": "parent_name",
        "type": "parent",
        "group": "parent_name",
        "id_name": "parent_id",
        "label": "Related to",
        "required": 0,
        "options": {
          "Accounts": {
            "name": "Accounts",
            "value": "Account"
          },
          "Contacts": {
            "name": "Contacts",
            "value": "Contact"
          },
          "Tasks": {
            "name": "Tasks",
            "value": "Task"
          },
          "Opportunities": {
            "name": "Opportunities",
            "value": "Opportunity"
          },
          "RevenueLineItems": {
            "name": "RevenueLineItems",
            "value": "Revenue Line Item"
          },
          "Products": {
            "name": "Products",
            "value": "Quoted Line Item"
          },
          "Quotes": {
            "name": "Quotes",
            "value": "Quote"
          },
          "Bugs": {
            "name": "Bugs",
            "value": "Bugs"
          },
          "Cases": {
            "name": "Cases",
            "value": "Case"
          },
          "Leads": {
            "name": "Leads",
            "value": "Lead"
          },
          "Prospects": {
            "name": "Prospects",
            "value": "Target"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "type_name": "parent_type"
      },
      "status": {
        "name": "status",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Status:",
        "required": 1,
        "options": {
          "Planned": {
            "name": "Planned",
            "value": "Planned"
          },
          "Held": {
            "name": "Held",
            "value": "Held"
          },
          "Not Held": {
            "name": "Not Held",
            "value": "Not Held"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100,
        "default_value": "Planned"
      },
      "direction": {
        "name": "direction",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Direction:",
        "required": 0,
        "options": {
          "Inbound": {
            "name": "Inbound",
            "value": "Inbound"
          },
          "Outbound": {
            "name": "Outbound",
            "value": "Outbound"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "parent_id": {
        "name": "parent_id",
        "type": "id",
        "group": "parent_name",
        "id_name": "",
        "label": "Related to ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reminder_checked": {
        "name": "reminder_checked",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Reminders:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reminder_time": {
        "name": "reminder_time",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Reminder Time",
        "required": 0,
        "options": {
          "60": {
            "name": 60,
            "value": "1 minute prior"
          },
          "300": {
            "name": 300,
            "value": "5 minutes prior"
          },
          "600": {
            "name": 600,
            "value": "10 minutes prior"
          },
          "900": {
            "name": 900,
            "value": "15 minutes prior"
          },
          "1800": {
            "name": 1800,
            "value": "30 minutes prior"
          },
          "3600": {
            "name": 3600,
            "value": "1 hour prior"
          },
          "7200": {
            "name": 7200,
            "value": "2 hours prior"
          },
          "10800": {
            "name": 10800,
            "value": "3 hours prior"
          },
          "18000": {
            "name": 18000,
            "value": "5 hours prior"
          },
          "86400": {
            "name": 86400,
            "value": "1 day prior"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": -1
      },
      "email_reminder_checked": {
        "name": "email_reminder_checked",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Email Reminder",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_reminder_time": {
        "name": "email_reminder_time",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Email Reminder Time",
        "required": 0,
        "options": {
          "60": {
            "name": 60,
            "value": "1 minute prior"
          },
          "300": {
            "name": 300,
            "value": "5 minutes prior"
          },
          "600": {
            "name": 600,
            "value": "10 minutes prior"
          },
          "900": {
            "name": 900,
            "value": "15 minutes prior"
          },
          "1800": {
            "name": 1800,
            "value": "30 minutes prior"
          },
          "3600": {
            "name": 3600,
            "value": "1 hour prior"
          },
          "7200": {
            "name": 7200,
            "value": "2 hours prior"
          },
          "10800": {
            "name": 10800,
            "value": "3 hours prior"
          },
          "18000": {
            "name": 18000,
            "value": "5 hours prior"
          },
          "86400": {
            "name": 86400,
            "value": "1 day prior"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": -1
      },
      "email_reminder_sent": {
        "name": "email_reminder_sent",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Email reminder sent",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": 0
      },
      "outlook_id": {
        "name": "outlook_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Outlook ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "accept_status": {
        "name": "accept_status",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "set_accept_links": {
        "name": "set_accept_links",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Accept Link",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "contact_name": {
        "name": "contact_name",
        "type": "relate",
        "group": "",
        "id_name": "contact_id",
        "label": "Contact:",
        "required": 0,
        "options": [],
        "related_module": "Contacts",
        "calculated": false,
        "len": 36
      },
      "accept_status_users": {
        "name": "accept_status_users",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "contact_id": {
        "name": "contact_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "contact_id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "repeat_type": {
        "name": "repeat_type",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Repeat",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": "None"
          },
          "Daily": {
            "name": "Daily",
            "value": "Daily"
          },
          "Weekly": {
            "name": "Weekly",
            "value": "Weekly"
          },
          "Monthly": {
            "name": "Monthly",
            "value": "Monthly"
          },
          "Yearly": {
            "name": "Yearly",
            "value": "Yearly"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 36
      },
      "repeat_interval": {
        "name": "repeat_interval",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Every",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 3,
        "default_value": 1
      },
      "repeat_dow": {
        "name": "repeat_dow",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "On",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 7
      },
      "repeat_until": {
        "name": "repeat_until",
        "type": "date",
        "group": "",
        "id_name": "",
        "label": "Repeat Until",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "repeat_count": {
        "name": "repeat_count",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Number of recurrences",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 7
      },
      "repeat_parent_id": {
        "name": "repeat_parent_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Repeat Parent ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 36
      },
      "recurring_source": {
        "name": "recurring_source",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Recurring Source",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 36
      },
      "send_invites": {
        "name": "send_invites",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Send Invites",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      }
    },
    "link_fields": {
      "favorite_link": {
        "name": "favorite_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_favorite",
        "module": "",
        "bean_name": ""
      },
      "following_link": {
        "name": "following_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_following",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "call_activities",
        "module": "Activities",
        "bean_name": "Activity"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_teams",
        "module": "",
        "bean_name": ""
      },
      "opportunities": {
        "name": "opportunities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_calls",
        "module": "",
        "bean_name": ""
      },
      "leads": {
        "name": "leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_leads",
        "module": "",
        "bean_name": ""
      },
      "project": {
        "name": "project",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "projects_calls",
        "module": "",
        "bean_name": ""
      },
      "cases": {
        "name": "cases",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "case_calls",
        "module": "",
        "bean_name": ""
      },
      "accounts": {
        "name": "accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "account_calls",
        "module": "Accounts",
        "bean_name": "Account"
      },
      "revenuelineitems": {
        "name": "revenuelineitems",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "revenuelineitem_calls",
        "module": "RevenueLineItems",
        "bean_name": "RevenueLineItem"
      },
      "products": {
        "name": "products",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "product_calls",
        "module": "Products",
        "bean_name": "Product"
      },
      "bugs": {
        "name": "bugs",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "bug_calls",
        "module": "Bugs",
        "bean_name": ""
      },
      "contacts": {
        "name": "contacts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_contacts",
        "module": "",
        "bean_name": ""
      },
      "prospects": {
        "name": "prospects",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "prospect_calls",
        "module": "Prospects",
        "bean_name": ""
      },
      "quotes": {
        "name": "quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quote_calls",
        "module": "",
        "bean_name": ""
      },
      "users": {
        "name": "users",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_users",
        "module": "",
        "bean_name": ""
      },
      "notes": {
        "name": "notes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_notes",
        "module": "Notes",
        "bean_name": "Note"
      }
    }
  },
  "Opportunities": {
    "module_name": "Opportunities",
    "table_name": "opportunities",
    "module_fields": {
      "my_favorite": {
        "name": "my_favorite",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Favorite",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "following": {
        "name": "following",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Following",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "name": {
        "name": "name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "Opportunity Name:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "created_by_name",
        "id_name": "",
        "label": "Date Created",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "modified_by_name",
        "id_name": "",
        "label": "Date Modified",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "modified_by_name",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "created_by_name",
        "id_name": "modified_user_id",
        "label": "Created By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "doc_owner": {
        "name": "doc_owner",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Document Onwer",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "user_favorites": {
        "name": "user_favorites",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Users Who Favorite",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": ""
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": "",
        "default_value": "0"
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "relate",
        "group": "assigned_user_name",
        "id_name": "assigned_user_id",
        "label": "Assigned User:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "opportunity_type": {
        "name": "opportunity_type",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Type:",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Existing Business": {
            "name": "Existing Business",
            "value": "Existing Business"
          },
          "New Business": {
            "name": "New Business",
            "value": "New Business"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "account_name": {
        "name": "account_name",
        "type": "relate",
        "group": "",
        "id_name": "account_id",
        "label": "Account Name:",
        "required": 1,
        "options": [],
        "related_module": "Accounts",
        "calculated": false,
        "len": "255"
      },
      "account_id": {
        "name": "account_id",
        "type": "relate",
        "group": "",
        "id_name": "account_id",
        "label": "Account ID",
        "required": 0,
        "options": [],
        "related_module": "Accounts",
        "calculated": false,
        "len": ""
      },
      "campaign_id": {
        "name": "campaign_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "campaign_id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "campaign_name": {
        "name": "campaign_name",
        "type": "relate",
        "group": "",
        "id_name": "campaign_id",
        "label": "Campaign:",
        "required": 0,
        "options": [],
        "related_module": "Campaigns",
        "calculated": false,
        "len": ""
      },
      "lead_source": {
        "name": "lead_source",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Lead Source",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Cold Call": {
            "name": "Cold Call",
            "value": "Cold Call"
          },
          "Existing Customer": {
            "name": "Existing Customer",
            "value": "Existing Customer"
          },
          "Self Generated": {
            "name": "Self Generated",
            "value": "Self Generated"
          },
          "Employee": {
            "name": "Employee",
            "value": "Employee"
          },
          "Partner": {
            "name": "Partner",
            "value": "Partner"
          },
          "Public Relations": {
            "name": "Public Relations",
            "value": "Public Relations"
          },
          "Direct Mail": {
            "name": "Direct Mail",
            "value": "Direct Mail"
          },
          "Conference": {
            "name": "Conference",
            "value": "Conference"
          },
          "Trade Show": {
            "name": "Trade Show",
            "value": "Trade Show"
          },
          "Web Site": {
            "name": "Web Site",
            "value": "Web Site"
          },
          "Word of mouth": {
            "name": "Word of mouth",
            "value": "Word of mouth"
          },
          "Email": {
            "name": "Email",
            "value": "Email"
          },
          "Campaign": {
            "name": "Campaign",
            "value": "Campaign"
          },
          "Support Portal User Registration": {
            "name": "Support Portal User Registration",
            "value": "Support Portal User Registration"
          },
          "Other": {
            "name": "Other",
            "value": "Other"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "amount": {
        "name": "amount",
        "type": "currency",
        "group": "",
        "id_name": "",
        "label": "Likely",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Does Not Equal"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "Greater Than"
          },
          "greater_than_equals": {
            "name": "greater_than_equals",
            "value": "Greater Than Or Equal To"
          },
          "less_than": {
            "name": "less_than",
            "value": "Less Than"
          },
          "less_than_equals": {
            "name": "less_than_equals",
            "value": "Less Than Or Equal To"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "base_rate": {
        "name": "base_rate",
        "type": "decimal",
        "group": "",
        "id_name": "",
        "label": "Currency Rate",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "26,6"
      },
      "amount_usdollar": {
        "name": "amount_usdollar",
        "type": "currency",
        "group": "amount",
        "id_name": "",
        "label": "Converted Amount",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "currency_id": {
        "name": "currency_id",
        "type": "currency_id",
        "group": "currency_id",
        "id_name": "",
        "label": "Currency:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "-99"
      },
      "currency_name": {
        "name": "currency_name",
        "type": "relate",
        "group": "",
        "id_name": "currency_id",
        "label": "Currency Name",
        "required": 0,
        "options": [],
        "related_module": "Currencies",
        "calculated": false,
        "len": ""
      },
      "currency_symbol": {
        "name": "currency_symbol",
        "type": "relate",
        "group": "",
        "id_name": "currency_id",
        "label": "Currency Symbol",
        "required": 0,
        "options": [],
        "related_module": "Currencies",
        "calculated": false,
        "len": ""
      },
      "date_closed": {
        "name": "date_closed",
        "type": "date",
        "group": "",
        "id_name": "",
        "label": "Expected Close Date:",
        "required": 0,
        "options": {
          "=": {
            "name": "=",
            "value": "Equals"
          },
          "not_equal": {
            "name": "not_equal",
            "value": "Not On"
          },
          "greater_than": {
            "name": "greater_than",
            "value": "After"
          },
          "less_than": {
            "name": "less_than",
            "value": "Before"
          },
          "last_7_days": {
            "name": "last_7_days",
            "value": "Last 7 Days"
          },
          "next_7_days": {
            "name": "next_7_days",
            "value": "Next 7 Days"
          },
          "last_30_days": {
            "name": "last_30_days",
            "value": "Last 30 Days"
          },
          "next_30_days": {
            "name": "next_30_days",
            "value": "Next 30 Days"
          },
          "last_month": {
            "name": "last_month",
            "value": "Last Month"
          },
          "this_month": {
            "name": "this_month",
            "value": "This Month"
          },
          "next_month": {
            "name": "next_month",
            "value": "Next Month"
          },
          "last_year": {
            "name": "last_year",
            "value": "Last Year"
          },
          "this_year": {
            "name": "this_year",
            "value": "This Year"
          },
          "next_year": {
            "name": "next_year",
            "value": "Next Year"
          },
          "between": {
            "name": "between",
            "value": "Is Between"
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_closed_timestamp": {
        "name": "date_closed_timestamp",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Expected Close Date Timestamp",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "next_step": {
        "name": "next_step",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Next Step:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "sales_stage": {
        "name": "sales_stage",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Sales Stage",
        "required": 0,
        "options": {
          "Prospecting": {
            "name": "Prospecting",
            "value": "Prospecting"
          },
          "Qualification": {
            "name": "Qualification",
            "value": "Qualification"
          },
          "Needs Analysis": {
            "name": "Needs Analysis",
            "value": "Needs Analysis"
          },
          "Value Proposition": {
            "name": "Value Proposition",
            "value": "Value Proposition"
          },
          "Id. Decision Makers": {
            "name": "Id. Decision Makers",
            "value": "Id. Decision Makers"
          },
          "Perception Analysis": {
            "name": "Perception Analysis",
            "value": "Perception Analysis"
          },
          "Proposal/Price Quote": {
            "name": "Proposal/Price Quote",
            "value": "Proposal/Price Quote"
          },
          "Negotiation/Review": {
            "name": "Negotiation/Review",
            "value": "Negotiation/Review"
          },
          "Closed Won": {
            "name": "Closed Won",
            "value": "Closed Won"
          },
          "Closed Lost": {
            "name": "Closed Lost",
            "value": "Closed Lost"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "255",
        "default_value": "Prospecting"
      },
      "sales_status": {
        "name": "sales_status",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Status",
        "required": 0,
        "options": {
          "New": {
            "name": "New",
            "value": "New"
          },
          "In Progress": {
            "name": "In Progress",
            "value": "In Progress"
          },
          "Closed Won": {
            "name": "Closed Won",
            "value": "Closed Won"
          },
          "Closed Lost": {
            "name": "Closed Lost",
            "value": "Closed Lost"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "probability": {
        "name": "probability",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Probability (%)",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "best_case": {
        "name": "best_case",
        "type": "currency",
        "group": "",
        "id_name": "",
        "label": "Best",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": "26,6"
      },
      "worst_case": {
        "name": "worst_case",
        "type": "currency",
        "group": "",
        "id_name": "",
        "label": "Worst",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": "26,6"
      },
      "commit_stage": {
        "name": "commit_stage",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Commit Stage",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "total_revenue_line_items": {
        "name": "total_revenue_line_items",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "# of Total Revenue Line Items",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "closed_revenue_line_items": {
        "name": "closed_revenue_line_items",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "# of Closed Revenue Line Items",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "contact_role": {
        "name": "contact_role",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Opportunity Role",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "Primary Decision Maker": {
            "name": "Primary Decision Maker",
            "value": "Primary Decision Maker"
          },
          "Business Decision Maker": {
            "name": "Business Decision Maker",
            "value": "Business Decision Maker"
          },
          "Business Evaluator": {
            "name": "Business Evaluator",
            "value": "Business Evaluator"
          },
          "Technical Decision Maker": {
            "name": "Technical Decision Maker",
            "value": "Technical Decision Maker"
          },
          "Technical Evaluator": {
            "name": "Technical Evaluator",
            "value": "Technical Evaluator"
          },
          "Executive Sponsor": {
            "name": "Executive Sponsor",
            "value": "Executive Sponsor"
          },
          "Influencer": {
            "name": "Influencer",
            "value": "Influencer"
          },
          "Other": {
            "name": "Other",
            "value": "Other"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "mkto_sync": {
        "name": "mkto_sync",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Sync to Marketo&reg;",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "mkto_id": {
        "name": "mkto_id",
        "type": "int",
        "group": "",
        "id_name": "",
        "label": "Marketo Lead ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      }
    },
    "link_fields": {
      "favorite_link": {
        "name": "favorite_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_favorite",
        "module": "",
        "bean_name": ""
      },
      "following_link": {
        "name": "following_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_following",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_activities",
        "module": "Activities",
        "bean_name": "Activity"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "assigned_user_id",
        "relationship": "opportunities_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_teams",
        "module": "",
        "bean_name": ""
      },
      "campaign_opportunities": {
        "name": "campaign_opportunities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "campaign_opportunities",
        "module": "",
        "bean_name": ""
      },
      "accounts": {
        "name": "accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "accounts_opportunities",
        "module": "Accounts",
        "bean_name": "Account"
      },
      "contacts": {
        "name": "contacts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_contacts",
        "module": "Contacts",
        "bean_name": "Contact"
      },
      "tasks": {
        "name": "tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_tasks",
        "module": "",
        "bean_name": ""
      },
      "notes": {
        "name": "notes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_notes",
        "module": "",
        "bean_name": ""
      },
      "meetings": {
        "name": "meetings",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_meetings",
        "module": "",
        "bean_name": ""
      },
      "calls": {
        "name": "calls",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_calls",
        "module": "",
        "bean_name": ""
      },
      "emails": {
        "name": "emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_opportunities_rel",
        "module": "",
        "bean_name": ""
      },
      "archived_emails": {
        "name": "archived_emails",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "",
        "module": "Emails",
        "bean_name": ""
      },
      "documents": {
        "name": "documents",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "documents_opportunities",
        "module": "",
        "bean_name": ""
      },
      "quotes": {
        "name": "quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "quotes_opportunities",
        "module": "",
        "bean_name": ""
      },
      "project": {
        "name": "project",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "projects_opportunities",
        "module": "",
        "bean_name": ""
      },
      "leads": {
        "name": "leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_leads",
        "module": "",
        "bean_name": ""
      },
      "campaigns": {
        "name": "campaigns",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "campaignlog_created_opportunities",
        "module": "CampaignLog",
        "bean_name": "CampaignLog"
      },
      "campaign_link": {
        "name": "campaign_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "campaign_opportunities",
        "module": "Campaigns",
        "bean_name": "Campaign"
      },
      "currencies": {
        "name": "currencies",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunity_currencies",
        "module": "",
        "bean_name": ""
      },
      "contracts": {
        "name": "contracts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contracts_opportunities",
        "module": "",
        "bean_name": ""
      },
      "revenuelineitems": {
        "name": "revenuelineitems",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_revenuelineitems",
        "module": "",
        "bean_name": ""
      },
      "forecastworksheets": {
        "name": "forecastworksheets",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "forecastworksheets_opportunities",
        "module": "ForecastWorksheets",
        "bean_name": "ForecastWorksheet"
      },
      "products": {
        "name": "products",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "opportunities_products",
        "module": "",
        "bean_name": ""
      }
    }
  },
  "Emails": {
    "module_name": "Emails",
    "table_name": "emails",
    "module_fields": {
      "team_id": {
        "name": "team_id",
        "type": "team_list",
        "group": "team_name",
        "id_name": "",
        "label": "Team Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Date Created:",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Date Modified",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "assigned_user_id": {
        "name": "assigned_user_id",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned To:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "assigned_user_name": {
        "name": "assigned_user_name",
        "type": "relate",
        "group": "",
        "id_name": "assigned_user_id",
        "label": "Assigned To:",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "modified_user_id",
        "label": "Modified By",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Created by",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": "36"
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Created by",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": "36"
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "from_addr_name": {
        "name": "from_addr_name",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "from_addr_name",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reply_to_addr": {
        "name": "reply_to_addr",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "reply_to_addr",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "to_addrs_names": {
        "name": "to_addrs_names",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "to_addrs_names",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "cc_addrs_names": {
        "name": "cc_addrs_names",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "cc_addrs_names",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "bcc_addrs_names": {
        "name": "bcc_addrs_names",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "bcc_addrs_names",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "raw_source": {
        "name": "raw_source",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "raw_source",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "description_html": {
        "name": "description_html",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "description_html",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "description": {
        "name": "description",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "description",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "date_sent": {
        "name": "date_sent",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Date Sent:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "message_id": {
        "name": "message_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Message ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 255
      },
      "message_uid": {
        "name": "message_uid",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Message UID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 64
      },
      "name": {
        "name": "name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "Subject:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "type": {
        "name": "type",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Type",
        "required": 0,
        "options": {
          "out": {
            "name": "out",
            "value": "Sent"
          },
          "archived": {
            "name": "archived",
            "value": "Archived"
          },
          "draft": {
            "name": "draft",
            "value": "Draft"
          },
          "inbound": {
            "name": "inbound",
            "value": "Inbound"
          },
          "campaign": {
            "name": "campaign",
            "value": "Campaign"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "status": {
        "name": "status",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Email Status:",
        "required": 0,
        "options": {
          "archived": {
            "name": "archived",
            "value": "Archived"
          },
          "closed": {
            "name": "closed",
            "value": "Closed"
          },
          "draft": {
            "name": "draft",
            "value": "In Draft"
          },
          "read": {
            "name": "read",
            "value": "Read"
          },
          "replied": {
            "name": "replied",
            "value": "Replied"
          },
          "sent": {
            "name": "sent",
            "value": "Sent"
          },
          "send_error": {
            "name": "send_error",
            "value": "Send Error"
          },
          "unread": {
            "name": "unread",
            "value": "Unread"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "flagged": {
        "name": "flagged",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Flagged:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reply_to_status": {
        "name": "reply_to_status",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Reply To Status:",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "intent": {
        "name": "intent",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Intent",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100,
        "default_value": "pick"
      },
      "mailbox_id": {
        "name": "mailbox_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "LBL_MAILBOX_ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "36"
      },
      "parent_name": {
        "name": "parent_name",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "parent_name",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "parent_type": {
        "name": "parent_type",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "parent_type",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "parent_id": {
        "name": "parent_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "parent_id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "36"
      }
    },
    "link_fields": {
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_teams",
        "module": "",
        "bean_name": ""
      },
      "created_by_link": {
        "name": "created_by_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_created_by",
        "module": "Users",
        "bean_name": "User"
      },
      "modified_user_link": {
        "name": "modified_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_modified_user",
        "module": "Users",
        "bean_name": "User"
      },
      "assigned_user_link": {
        "name": "assigned_user_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_assigned_user",
        "module": "Users",
        "bean_name": "User"
      },
      "accounts": {
        "name": "accounts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_accounts_rel",
        "module": "Accounts",
        "bean_name": "Account"
      },
      "bugs": {
        "name": "bugs",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_bugs_rel",
        "module": "Bugs",
        "bean_name": "Bug"
      },
      "cases": {
        "name": "cases",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_cases_rel",
        "module": "Cases",
        "bean_name": "Case"
      },
      "contacts": {
        "name": "contacts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_contacts_rel",
        "module": "Contacts",
        "bean_name": "Contact"
      },
      "leads": {
        "name": "leads",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_leads_rel",
        "module": "Leads",
        "bean_name": "Lead"
      },
      "opportunities": {
        "name": "opportunities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_opportunities_rel",
        "module": "Opportunities",
        "bean_name": "Opportunity"
      },
      "project": {
        "name": "project",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_projects_rel",
        "module": "Project",
        "bean_name": "Project"
      },
      "projecttask": {
        "name": "projecttask",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_project_task_rel",
        "module": "ProjectTask",
        "bean_name": "ProjectTask"
      },
      "prospects": {
        "name": "prospects",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_prospects_rel",
        "module": "Prospects",
        "bean_name": "Prospect"
      },
      "quotes": {
        "name": "quotes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_quotes",
        "module": "Quotes",
        "bean_name": "Quote"
      },
      "revenuelineitems": {
        "name": "revenuelineitems",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_revenuelineitems_rel",
        "module": "RevenueLineItems",
        "bean_name": "RevenueLineItem"
      },
      "products": {
        "name": "products",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_products_rel",
        "module": "Products",
        "bean_name": "Product"
      },
      "tasks": {
        "name": "tasks",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_tasks_rel",
        "module": "Tasks",
        "bean_name": "Task"
      },
      "users": {
        "name": "users",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_users_rel",
        "module": "Users",
        "bean_name": "User"
      },
      "notes": {
        "name": "notes",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_notes_rel",
        "module": "Notes",
        "bean_name": "Note"
      },
      "meetings": {
        "name": "meetings",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_meetings_rel",
        "module": "Meetings",
        "bean_name": "Meeting"
      }
    }
  },
  "Users": {
    "module_name": "Users",
    "table_name": "users",
    "module_fields": {
      "id": {
        "name": "id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "ID",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "user_name": {
        "name": "user_name",
        "type": "user_name",
        "group": "",
        "id_name": "",
        "label": "User Name",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "60"
      },
      "user_hash": {
        "name": "user_hash",
        "type": "password",
        "group": "",
        "id_name": "",
        "label": "Password",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "system_generated_password": {
        "name": "system_generated_password",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "System Generated Password",
        "required": 1,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "pwd_last_changed": {
        "name": "pwd_last_changed",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Password Last Changed",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "authenticate_id": {
        "name": "authenticate_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Authentication Id",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "sugar_login": {
        "name": "sugar_login",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Is Sugar User",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "1"
      },
      "picture": {
        "name": "picture",
        "type": "image",
        "group": "",
        "id_name": "",
        "label": "Avatar",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "255"
      },
      "first_name": {
        "name": "first_name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "First Name",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "30"
      },
      "last_name": {
        "name": "last_name",
        "type": "name",
        "group": "name",
        "id_name": "",
        "label": "Last Name",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "30"
      },
      "full_name": {
        "name": "full_name",
        "type": "fullname",
        "group": "name",
        "id_name": "",
        "label": "Full Name",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "510"
      },
      "name": {
        "name": "name",
        "type": "fullname",
        "group": "name",
        "id_name": "",
        "label": "Full Name",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "510"
      },
      "is_admin": {
        "name": "is_admin",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Is Administrator",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "external_auth_only": {
        "name": "external_auth_only",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "External Authentication",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "receive_notifications": {
        "name": "receive_notifications",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Notify on Assignment",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "1"
      },
      "description": {
        "name": "description",
        "type": "text",
        "group": "",
        "id_name": "",
        "label": "Description",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "date_entered": {
        "name": "date_entered",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Date Entered",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "date_modified": {
        "name": "date_modified",
        "type": "datetime",
        "group": "",
        "id_name": "",
        "label": "Date Modified",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_user_id": {
        "name": "modified_user_id",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "modified_user_id",
        "label": "Modified By ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "modified_by_name": {
        "name": "modified_by_name",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "modified_user_id",
        "label": "Modified By ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by": {
        "name": "created_by",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "modified_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "created_by_name": {
        "name": "created_by_name",
        "type": "assigned_user_name",
        "group": "",
        "id_name": "modified_user_id",
        "label": "Assigned to:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "title": {
        "name": "title",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Title",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "department": {
        "name": "department",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Department",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "phone_home": {
        "name": "phone_home",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Home Phone",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "phone_mobile": {
        "name": "phone_mobile",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Mobile",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "phone_work": {
        "name": "phone_work",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Work Phone",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "phone_other": {
        "name": "phone_other",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Other Phone",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "phone_fax": {
        "name": "phone_fax",
        "type": "phone",
        "group": "phone",
        "id_name": "",
        "label": "Fax",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "50"
      },
      "status": {
        "name": "status",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Status",
        "required": 1,
        "options": {
          "Active": {
            "name": "Active",
            "value": "Active"
          },
          "Inactive": {
            "name": "Inactive",
            "value": "Inactive"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "address_street": {
        "name": "address_street",
        "type": "text",
        "group": "address",
        "id_name": "",
        "label": "Address Street",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "150"
      },
      "address_city": {
        "name": "address_city",
        "type": "varchar",
        "group": "address",
        "id_name": "",
        "label": "Address City",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "address_state": {
        "name": "address_state",
        "type": "varchar",
        "group": "address",
        "id_name": "",
        "label": "Address State",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "100"
      },
      "address_country": {
        "name": "address_country",
        "type": "varchar",
        "group": "address",
        "id_name": "",
        "label": "Address Country",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "address_postalcode": {
        "name": "address_postalcode",
        "type": "varchar",
        "group": "address",
        "id_name": "",
        "label": "Address Postal Code",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "20"
      },
      "UserType": {
        "name": "UserType",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "User Type",
        "required": 0,
        "options": {
          "RegularUser": {
            "name": "RegularUser",
            "value": "Regular User"
          },
          "Administrator": {
            "name": "Administrator",
            "value": "Administrator"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 50
      },
      "default_team": {
        "name": "default_team",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Default Teams",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "36"
      },
      "team_id": {
        "name": "team_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Default Teams",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": "36"
      },
      "team_set_id": {
        "name": "team_set_id",
        "type": "id",
        "group": "",
        "id_name": "team_set_id",
        "label": "Team Set ID",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "team_count": {
        "name": "team_count",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": ""
      },
      "team_name": {
        "name": "team_name",
        "type": "relate",
        "group": "",
        "id_name": "team_id",
        "label": "Teams",
        "required": 1,
        "options": [],
        "related_module": "Teams",
        "calculated": false,
        "len": 36
      },
      "deleted": {
        "name": "deleted",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Deleted",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": true,
        "len": ""
      },
      "portal_only": {
        "name": "portal_only",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Portal API User",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": "0"
      },
      "show_on_employees": {
        "name": "show_on_employees",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Display Employee Record",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": "",
        "default_value": true
      },
      "employee_status": {
        "name": "employee_status",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Employee Status",
        "required": 0,
        "options": {
          "Active": {
            "name": "Active",
            "value": "Active"
          },
          "Terminated": {
            "name": "Terminated",
            "value": "Terminated"
          },
          "Leave of Absence": {
            "name": "Leave of Absence",
            "value": "Leave of Absence"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "messenger_id": {
        "name": "messenger_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "IM Name",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "messenger_type": {
        "name": "messenger_type",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "IM Type",
        "required": 0,
        "options": {
          "": {
            "name": "",
            "value": ""
          },
          "MSN": {
            "name": "MSN",
            "value": "MSN"
          },
          "Yahoo!": {
            "name": "Yahoo!",
            "value": "Yahoo!"
          },
          "AOL": {
            "name": "AOL",
            "value": "AOL"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": 100
      },
      "reports_to_id": {
        "name": "reports_to_id",
        "type": "id",
        "group": "",
        "id_name": "",
        "label": "Reports to ID:",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "reports_to_name": {
        "name": "reports_to_name",
        "type": "relate",
        "group": "",
        "id_name": "reports_to_id",
        "label": "Reports to",
        "required": 0,
        "options": [],
        "related_module": "Users",
        "calculated": false,
        "len": ""
      },
      "email1": {
        "name": "email1",
        "type": "varchar",
        "group": "email",
        "id_name": "",
        "label": "Email Address",
        "required": 1,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email": {
        "name": "email",
        "type": "email",
        "group": "email",
        "id_name": "",
        "label": "Email",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "email_link_type": {
        "name": "email_link_type",
        "type": "enum",
        "group": "email",
        "id_name": "",
        "label": "Email Client",
        "required": 0,
        "options": {
          "sugar": {
            "name": "sugar",
            "value": "Sugar Email Client"
          },
          "mailto": {
            "name": "mailto",
            "value": "External Email Client"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "is_group": {
        "name": "is_group",
        "type": "bool",
        "group": "",
        "id_name": "",
        "label": "Group User",
        "required": 0,
        "options": {
          "1": {
            "name": 1,
            "value": "Yes"
          },
          "2": {
            "name": 2,
            "value": "No"
          },
          "": {
            "name": "",
            "value": ""
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "c_accept_status_fields": {
        "name": "c_accept_status_fields",
        "type": "relate",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "m_accept_status_fields": {
        "name": "m_accept_status_fields",
        "type": "relate",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_id": {
        "name": "accept_status_id",
        "type": "varchar",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": [],
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_name": {
        "name": "accept_status_name",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_calls": {
        "name": "accept_status_calls",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "accept_status_meetings": {
        "name": "accept_status_meetings",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Accept Status",
        "required": 0,
        "options": {
          "accept": {
            "name": "accept",
            "value": "Accepted"
          },
          "decline": {
            "name": "decline",
            "value": "Declined"
          },
          "tentative": {
            "name": "tentative",
            "value": "Tentative"
          },
          "none": {
            "name": "none",
            "value": "None"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      },
      "preferred_language": {
        "name": "preferred_language",
        "type": "enum",
        "group": "",
        "id_name": "",
        "label": "Language Preference:",
        "required": 0,
        "options": {
          "en_us": {
            "name": "en_us",
            "value": "English (US)"
          },
          "bg_BG": {
            "name": "bg_BG",
            "value": "Български"
          },
          "cs_CZ": {
            "name": "cs_CZ",
            "value": "Česky"
          },
          "da_DK": {
            "name": "da_DK",
            "value": "Dansk"
          },
          "de_DE": {
            "name": "de_DE",
            "value": "Deutsch"
          },
          "el_EL": {
            "name": "el_EL",
            "value": "Ελληνικά"
          },
          "es_ES": {
            "name": "es_ES",
            "value": "Español"
          },
          "fr_FR": {
            "name": "fr_FR",
            "value": "Français"
          },
          "he_IL": {
            "name": "he_IL",
            "value": "עברית"
          },
          "hu_HU": {
            "name": "hu_HU",
            "value": "Magyar"
          },
          "it_it": {
            "name": "it_it",
            "value": "Italiano"
          },
          "lt_LT": {
            "name": "lt_LT",
            "value": "Lietuvių"
          },
          "ja_JP": {
            "name": "ja_JP",
            "value": "日本語"
          },
          "ko_KR": {
            "name": "ko_KR",
            "value": "한국어"
          },
          "lv_LV": {
            "name": "lv_LV",
            "value": "Latviešu"
          },
          "nb_NO": {
            "name": "nb_NO",
            "value": "Bokmål"
          },
          "nl_NL": {
            "name": "nl_NL",
            "value": "Nederlands"
          },
          "pl_PL": {
            "name": "pl_PL",
            "value": "Polski"
          },
          "pt_PT": {
            "name": "pt_PT",
            "value": "Português"
          },
          "ro_RO": {
            "name": "ro_RO",
            "value": "Română"
          },
          "ru_RU": {
            "name": "ru_RU",
            "value": "Русский"
          },
          "sv_SE": {
            "name": "sv_SE",
            "value": "Svenska"
          },
          "tr_TR": {
            "name": "tr_TR",
            "value": "Türkçe"
          },
          "zh_CN": {
            "name": "zh_CN",
            "value": "简体中文"
          },
          "pt_BR": {
            "name": "pt_BR",
            "value": "Português Brasileiro"
          },
          "ca_ES": {
            "name": "ca_ES",
            "value": "Català"
          },
          "en_UK": {
            "name": "en_UK",
            "value": "English (UK)"
          },
          "sr_RS": {
            "name": "sr_RS",
            "value": "Српски"
          },
          "sk_SK": {
            "name": "sk_SK",
            "value": "Slovenčina"
          },
          "sq_AL": {
            "name": "sq_AL",
            "value": "Shqip"
          },
          "et_EE": {
            "name": "et_EE",
            "value": "Eesti"
          },
          "es_LA": {
            "name": "es_LA",
            "value": "Español (Latinoamérica)"
          },
          "fi_FI": {
            "name": "fi_FI",
            "value": "Finnish"
          }
        },
        "related_module": "",
        "calculated": false,
        "len": ""
      }
    },
    "link_fields": {
      "team_link": {
        "name": "team_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "default_primary_team": {
        "name": "default_primary_team",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_team",
        "module": "Teams",
        "bean_name": "Team"
      },
      "team_count_link": {
        "name": "team_count_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_team_count_relationship",
        "module": "Teams",
        "bean_name": "TeamSet"
      },
      "teams": {
        "name": "teams",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_teams",
        "module": "",
        "bean_name": ""
      },
      "team_memberships": {
        "name": "team_memberships",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "team_memberships",
        "module": "",
        "bean_name": ""
      },
      "team_sets": {
        "name": "team_sets",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_team_sets",
        "module": "",
        "bean_name": ""
      },
      "users_signatures": {
        "name": "users_signatures",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_users_signatures",
        "module": "",
        "bean_name": ""
      },
      "calls": {
        "name": "calls",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "calls_users",
        "module": "",
        "bean_name": ""
      },
      "meetings": {
        "name": "meetings",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "meetings_users",
        "module": "",
        "bean_name": ""
      },
      "contacts_sync": {
        "name": "contacts_sync",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "contacts_users",
        "module": "",
        "bean_name": ""
      },
      "reports_to_link": {
        "name": "reports_to_link",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "user_direct_reports",
        "module": "",
        "bean_name": ""
      },
      "reportees": {
        "name": "reportees",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "user_direct_reports",
        "module": "",
        "bean_name": ""
      },
      "email_addresses": {
        "name": "email_addresses",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_email_addresses",
        "module": "EmailAddress",
        "bean_name": "EmailAddress"
      },
      "email_addresses_primary": {
        "name": "email_addresses_primary",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_email_addresses_primary",
        "module": "",
        "bean_name": ""
      },
      "aclroles": {
        "name": "aclroles",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "acl_roles_users",
        "module": "",
        "bean_name": ""
      },
      "prospect_lists": {
        "name": "prospect_lists",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "prospect_list_users",
        "module": "ProspectLists",
        "bean_name": ""
      },
      "emails_users": {
        "name": "emails_users",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "emails_users_rel",
        "module": "Emails",
        "bean_name": ""
      },
      "holidays": {
        "name": "holidays",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_holidays",
        "module": "",
        "bean_name": ""
      },
      "eapm": {
        "name": "eapm",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "eapm_assigned_user",
        "module": "",
        "bean_name": ""
      },
      "oauth_tokens": {
        "name": "oauth_tokens",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "oauthtokens_assigned_user",
        "module": "OAuthTokens",
        "bean_name": "OAuthToken"
      },
      "project_resource": {
        "name": "project_resource",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "projects_users_resources",
        "module": "",
        "bean_name": ""
      },
      "quotas": {
        "name": "quotas",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_quotas",
        "module": "",
        "bean_name": ""
      },
      "forecasts": {
        "name": "forecasts",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "users_forecasts",
        "module": "",
        "bean_name": ""
      },
      "activities": {
        "name": "activities",
        "type": "link",
        "group": "",
        "id_name": "",
        "relationship": "activities_users",
        "module": "Activities",
        "bean_name": "Activity"
      }
    }
  }
};
