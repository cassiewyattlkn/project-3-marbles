# project-3-marbles
  Data Visualization Track

  # Museums, Aquariums and Zoos

## Project Overview and Purpose 

The objective of this project was to select a dataset to use for presenting visualizations focused on providing users an interactive way to explore the data.
A dataset on museums, aquariums, and zoos in the United States was found on Kaggle.com and selected to build an interactive dashboard offering a comprehensive overview of the distribution of museums, aquariums, and zoos across the United States. The dashboard was constructed to feature three views of museums along with a dropdown list of museums by state. The views decided on were a US map showing locations of the museums, a bar chart showing the top 10 museums by revenue by state, and a pie chart depicting the various types of museums.

To make the dashboard, the dataset from Kaggle.com, https://www.kaggle.com/datasets/imls/museum-directory/data, was used. This dataset was in the form of a 6.82MB csv file consisting of more than 33,000 rows across 25 columns. Each row of data included the museum name and museum type as well as location data and tax-based income and revenue data.

The csv file was imported into a MongoDB collection and from there read into a Jupyter notebook where it was transformed through reduction and renaming of columns and elimination of null values. The data was then converted into dictionary format and reloaded into Mongo, and the resulting JSON file then used as the source for JavaScript (JS) files.

Two HTML files were then prepared: an “index.html” file to set up the dashboard and a “myMap.html” file for the map itself on the dashboard. The myMap.html, in particular, made use of the “Marker Cluster” CSS from Leaflet. In addition to the pair of HTML files, two JS files, “museumMarkerClusterMap.js” and “Charts.js”, were written to show the US map of museum locations, accompanied by the state dropdown list (in alphabetical order) and the bar and polar charts for top 10 revenue totals and museum types, respectively. The use of the charts.js file further served to introduce a different library than has previously been used in class activities.

## Usage and Interactivity

To access the interactive map, click on the image of the map on the dashboard. The map consists of groups of markers that represent museums within an area, and can be used to gain an idea of the number of museums found in a specific place. There are three different views that you can choose between for the map. Once you have zoomed in and selected a singular marker, the museum’s name, type, locale (1-City, 2-Suburb, 3-Town, and 4-Rural), and revenue will appear in a popup.

Underneath the map is a dropdown box with a list of states to choose from. Below that is a pair of charts that display information for the selected state. The bar chart shows the top ten museums with the highest revenue in a state. Each museum’s revenue is given in dollars. The bar chart also dynamically colors each displayed bar based on the museum’s NCES assigned locale code, which informs the user of the type of territory. The pie chart shows the percentage of each type of museum in a state, which museum types are the most common and which are the least.

## Ethical Considerations

The first major area of consideration from an ethical perspective with respect to the dataset was whether there were specific legal protections surrounding it; specifically, was the data protected by copyright law? Could the data be used?

On the Kaggle site where the data was found (https://www.kaggle.com/datasets/imls/museum-directory?resource=download), on the right side of the screen, there is a “License” header, and below that, a link to “CCO: Public Domain.”  That link takes the user to a “CC0 1.0 DEED/CC0 1.0 Universal” screen where there is an explicit “No Copyright” designation. And beside that designation is an explanation that “the person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.” In addition, it is stated that the work can be copied, modified, distributed, and performed without asking permission.

In further consideration of any copyright or other like legal protections, the primary source for the Kaggle dataset was also reviewed. On the Kaggle site, acknowledgement was given to the dataset being compiled from IMLS records, IRS records for tax-exempt organizations, and private foundation grant recipients. Review of the Institute of Museum and Library Sciences (IMLS) website itself (https://www.imls.gov/research-evaluation/data-collection/museum-data-files) revealed that the museum data was compiled from multiple sources, including the IMLS’s own administrative data and records, Internal Revenue Service (IRS) nonprofit data, lists of grantees from private foundations, museum associations, and data obtained from multiple original source lists.

And in the IMLS’s section on public library survey data (https://www.imls.gov/research-evaluation/data-collection/public-libraries-survey), in particular, IMLS stated that the data files available on its website are public-use data files that are available without restriction and do not require a license. In addition, where applicable, the files had some data removed to protect the confidentiality of individuals and to assure that there is no individually identifiable information.

That satisfied due diligence with respect to any concerns from a copyright or license perspective, but because IMLS’s statements about individual identifiable information were specific to public library data and not museum data, due diligence continued to the second major area of ethical consideration, privacy. Was there any data in the museum dataset that would raise privacy concerns and be subject to applicable data and privacy regulations and laws?

Consideration of that was actually related to the first one about copyright and legal protections inasmuch as one of the sources for the dataset was IRS nonprofit data. In contrast to tax information on individuals, the IRS publishes corporate tax returns, including those on nonprofit organizations such as museums. Accordingly, the presence of financial information (income and revenue) on museums themselves in the dataset did not raise privacy concerns.

But were there still any privacy concerns relative to other data in the dataset? A full review of the dataset confirmed, as indicated by the IMLS on its website with respect at least to its public library survey data: the museum data also did not contain any individually identifiable information. Accordingly, the dataset cleared checkpoints with respect to major US federal laws and regulations that would otherwise be applicable – the Fair Credit Reporting Act of 1970, Family Educational Rights and Privacy Act of 1974, Electronic Communications Privacy Act of 1986, Children’s Online Privacy Protection Act of 1998, GrammLeach-Bliley Act of 1999, and California Consumer Privacy Act (2018). And because the dataset was confined to US museums and data exclusively on them, the dataset also cleared a checkpoint with respect to the General Data Privacy Regulation that applies to data on citizens of EU member states only.

## References for the Data Source
Museum Dataset: (https://www.kaggle.com/datasets/imls/museum-directory)
Locale Codes: (https://nces.ed.gov/programs/edge/Geographic/LocaleBoundaries)

## References for Code
The code in lines 78-79 of the Charts.js file, which sorts a dictionary by its key values, was sourced from a Stack Overflow Board: (https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript)
The code in lines 159-162 of the Charts.js file, which sorts the bar chart in ascending order, was sourced from here: (https://community.plotly.com/t/horizontal-bar-automatically-order-by-numerical-value/7183)
The code in lines 179-190, which develops and displays the Pie chart when a state is selected, was sourced from plotly.com: (https://plotly.com/javascript/pie-charts/)
The code in line 11 on the html file and lines 173, 180, 198, and 204, which trigger the animations when the webpage and the charts load was sourced from animate.style: (https://animate.style/)
