import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import Link from "next/link";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "100vw",
  position: "absolute",
  top: 80,
  left: 0,
  right: 0,
  paddingBlock: theme.spacing(4),
  paddingInline: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const MegaMenu = ({ categories, onClick, ...rest }) => {
  const theme = useTheme();
  return (
    <DemoPaper variant="elevation" {...rest}>
      <div className="columns-2 md:columns-3 lg:columns-5 gap-8 overflow-y-auto">
        {categories.map((category) => (
          <div key={category._id} className="mb-6 break-inside-avoid">
            <Typography
              sx={{ color: theme.palette.primary.dark, fontWeight: 600, mb: 1 }}
              textAlign="left"
            >
              <Link href={`/products/${category.slug}`}>{category.label}</Link>
            </Typography>
            <div className="flex flex-col gap-1">
              {category.children.map((option) => (
                <Typography
                  key={option._id}
                  textAlign="left"
                  component={Link}
                  onClick={onClick}
                  href={`/products/${category.slug}?categories=${option.slug}`}
                  sx={{
                    "&:hover": {
                      fontWeight: 600,
                    },
                  }}
                >
                  {option.label}
                </Typography>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DemoPaper>
  );
};

export default MegaMenu;
