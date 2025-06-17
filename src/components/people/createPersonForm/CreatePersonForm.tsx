import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatePersonMutation } from "@/store/services/person";
import { toast } from "sonner";
import { useAuth } from "@/hooks";
import { personValidationSchema } from "./validation";

type Props = {
  onSuccess: () => void;
};

const CreatePersonForm = ({ onSuccess }: Props) => {
  const [createPerson] = useCreatePersonMutation();
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      preferred_name: "",
      date_of_birth: "",
      gender: "",
      marital_status: "",
      mobile_number: "",
      home_email: "",
      office_email: "",
      home_address: "",
      office_address: "",
      user_id: user?.id || "",
    },
    validationSchema: personValidationSchema,
    onSubmit: async (values) => {
      try {
        await createPerson(values).unwrap();
        toast.success("Person created successfully");
        onSuccess();
      } catch (error) {
        toast.error("Failed to create person");
        console.error("Error creating person:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="first_name" className="text-sm font-medium">
            First Name
          </label>
          <Input
            id="first_name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.first_name && formik.errors.first_name
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <p className="text-sm text-destructive">
              {formik.errors.first_name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="last_name" className="text-sm font-medium">
            Last Name
          </label>
          <Input
            id="last_name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.last_name && formik.errors.last_name
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <p className="text-sm text-destructive">
              {formik.errors.last_name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="preferred_name" className="text-sm font-medium">
            Preferred Name
          </label>
          <Input
            id="preferred_name"
            name="preferred_name"
            value={formik.values.preferred_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date_of_birth" className="text-sm font-medium">
            Date of Birth
          </label>
          <Input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={formik.values.date_of_birth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.date_of_birth && formik.errors.date_of_birth
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.date_of_birth && formik.errors.date_of_birth && (
            <p className="text-sm text-destructive">
              {formik.errors.date_of_birth}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="gender" className="text-sm font-medium">
            Gender
          </label>
          <Input
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.gender && formik.errors.gender
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-sm text-destructive">{formik.errors.gender}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="marital_status" className="text-sm font-medium">
            Marital Status
          </label>
          <Input
            id="marital_status"
            name="marital_status"
            value={formik.values.marital_status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.marital_status && formik.errors.marital_status
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.marital_status && formik.errors.marital_status && (
            <p className="text-sm text-destructive">
              {formik.errors.marital_status}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="mobile_number" className="text-sm font-medium">
            Mobile Number
          </label>
          <Input
            id="mobile_number"
            name="mobile_number"
            value={formik.values.mobile_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.mobile_number && formik.errors.mobile_number
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.mobile_number && formik.errors.mobile_number && (
            <p className="text-sm text-destructive">
              {formik.errors.mobile_number}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="home_email" className="text-sm font-medium">
            Home Email
          </label>
          <Input
            id="home_email"
            name="home_email"
            type="email"
            value={formik.values.home_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.home_email && formik.errors.home_email
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.home_email && formik.errors.home_email && (
            <p className="text-sm text-destructive">
              {formik.errors.home_email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="office_email" className="text-sm font-medium">
            Office Email
          </label>
          <Input
            id="office_email"
            name="office_email"
            type="email"
            value={formik.values.office_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.office_email && formik.errors.office_email
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.office_email && formik.errors.office_email && (
            <p className="text-sm text-destructive">
              {formik.errors.office_email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="home_address" className="text-sm font-medium">
            Home Address
          </label>
          <Input
            id="home_address"
            name="home_address"
            value={formik.values.home_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.home_address && formik.errors.home_address
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.home_address && formik.errors.home_address && (
            <p className="text-sm text-destructive">
              {formik.errors.home_address}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="office_address" className="text-sm font-medium">
            Office Address
          </label>
          <Input
            id="office_address"
            name="office_address"
            value={formik.values.office_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.office_address && formik.errors.office_address
                ? "border-destructive"
                : ""
            }
          />
          {formik.touched.office_address && formik.errors.office_address && (
            <p className="text-sm text-destructive">
              {formik.errors.office_address}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">Create Person</Button>
      </div>
    </form>
  );
};

export default CreatePersonForm;
