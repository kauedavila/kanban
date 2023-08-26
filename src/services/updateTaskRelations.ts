type UpdateTaskRelationProps = {
  taskID: string;
  taskListID: string;
};

const UpdateTaskRelation = async ({
  taskID,
  taskListID,
}: UpdateTaskRelationProps) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskID}?populate=*/`,
    {
      method: "put",
      body: JSON.stringify({
        data: {
          task_list: {
            connect: [
              {
                id: taskListID,
              },
            ],
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    }
  );
};

export default UpdateTaskRelation;
