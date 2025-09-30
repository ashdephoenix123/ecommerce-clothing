import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const groupedBrands = {
  A: [
    "Adidas",
    "Apple",
    "Asics",
    "Acer",
    "Armani",
    "Allbirds",
    "Airbnb",
    "Aldo",
  ],
  B: [
    "BMW",
    "Bosch",
    "Balenciaga",
    "Burberry",
    "Bose",
    "Bridgestone",
    "Bata",
    "Blackberry",
    "Benetton",
    "Birkenstock",
  ],
  C: [
    "Canon",
    "Coca-Cola",
    "Columbia",
    "Crocs",
    "Casio",
    "Chevrolet",
    "Converse",
    "Calvin Klein",
    "Coach",
    "Chanel",
  ],
  D: [
    "Dell",
    "Dior",
    "Domino’s",
    "Disney",
    "Diesel",
    "Dropbox",
    "Dunlop",
    "Doc Martens",
  ],
  E: [
    "Epson",
    "Estee Lauder",
    "eBay",
    "Ecko",
    "Etnies",
    "Eileen Fisher",
    "Everlane",
  ],
  F: [
    "Fila",
    "Ford",
    "Fossil",
    "Facebook",
    "Ferrari",
    "Forever 21",
    "Funskool",
    "Fred Perry",
  ],
  G: [
    "Google",
    "Gucci",
    "Gap",
    "Givenchy",
    "GoPro",
    "Guess",
    "General Motors",
    "GAP Kids",
    "Giorgio Armani",
  ],
  H: [
    "HP",
    "H&M",
    "Hermes",
    "Honda",
    "Hilfiger",
    "Harley-Davidson",
    "Hugo Boss",
    "Heineken",
  ],
  I: ["Ikea", "Intel", "Instagram", "Indigo", "Issey Miyake", "Icebreaker"],
  J: [
    "JBL",
    "Jaguar",
    "Jockey",
    "John Players",
    "Jack & Jones",
    "Juicy Couture",
  ],
  K: ["Kia", "Kellogg’s", "Kenzo", "Karl Lagerfeld", "Kappa", "Kate Spade"],
  L: [
    "Levi’s",
    "Lacoste",
    "LG",
    "Lamborghini",
    "L’Oréal",
    "Lululemon",
    "Louis Vuitton",
  ],
  M: [
    "Microsoft",
    "Motorola",
    "Mercedes",
    "Mango",
    "Moncler",
    "Michael Kors",
    "Montblanc",
    "McDonald’s",
  ],
  N: [
    "Nike",
    "Nestle",
    "Nikon",
    "Nautica",
    "Nintendo",
    "New Balance",
    "Netflix",
  ],
  P: ["Pepsi", "Puma", "Prada", "Philips", "Porsche", "Patagonia", "Pandora"],
  R: [
    "Reebok",
    "Rolex",
    "Ray-Ban",
    "Ralph Lauren",
    "Razer",
    "Red Bull",
    "Rado",
  ],
  S: [
    "Samsung",
    "Sony",
    "Starbucks",
    "Swatch",
    "Supreme",
    "Skechers",
    "Shell",
    "Santoni",
    "Speedo",
  ],
  T: [
    "Tesla",
    "Toyota",
    "Timberland",
    "Tommy Hilfiger",
    "Tissot",
    "Tag Heuer",
    "TikTok",
  ],
  V: [
    "Volkswagen",
    "Versace",
    "Valentino",
    "Vans",
    "Volvo",
    "Victoria’s Secret",
  ],
  Z: ["Zara", "Zoom", "Zegna", "Zappos", "Zenith"],
};

export default function AllOptions({ label, open, handleClose }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              size="small"
              variant="filled"
              placeholder={`Search ${label}`}
            />
            <Button
              sx={{ p: 0, justifyContent: "end" }}
              disableRipple
              onClick={handleClose}
            >
              <RxCross1 size={20} />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              mt: 2,
              columnCount: { xs: 2, md: 4 }, // responsive column count
              columnGap: 2,
              maxHeight: 500,
              overflowY: "auto",
            }}
          >
            {Object.keys(groupedBrands).map((letter) => (
              <div key={letter}>
                <h2 className="text-lg font-bold mb-2">{letter}</h2>
                <div className="grid grid-cols-1 gap-2">
                  <FormGroup>
                    {groupedBrands[letter].map((brand, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            icon={<IoSquareOutline />}
                            checkedIcon={<IoCheckbox />}
                          />
                        }
                        label={brand}
                        sx={{ margin: 0 }}
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
