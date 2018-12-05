def get_your_weaves():
    results =[]
    my_memberships = db(db.weave_membership.user_id == auth.user.id).select()

    for m in my_memberships:
        weave = db(db.weave.id == m.weave_id).select().first()
        if weave.creator != auth.user.email:
            results.append(dict(
            title=weave.title,
            purpose=weave.purpose,
            members=db(db.weave_membership.weave_id == weave.id).select()
        ))
    
    return response.json(dict(results=results))